"""API для работы с отзывами на вики-сайте"""
import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            action = event.get('queryStringParameters', {}).get('action', 'get_reviews')
            
            if action == 'get_reviews':
                cur.execute("""
                    SELECT id, username, rating, comment, created_at, is_admin, is_update_maker
                    FROM reviews
                    ORDER BY created_at DESC
                """)
                reviews = []
                for row in cur.fetchall():
                    review_id = row[0]
                    cur.execute("""
                        SELECT id, username, reply_text, created_at, is_admin, is_update_maker
                        FROM review_replies
                        WHERE review_id = %s
                        ORDER BY created_at ASC
                    """, (review_id,))
                    replies = [
                        {
                            'id': r[0],
                            'username': r[1],
                            'reply_text': r[2],
                            'created_at': r[3].isoformat(),
                            'is_admin': r[4],
                            'is_update_maker': r[5]
                        }
                        for r in cur.fetchall()
                    ]
                    reviews.append({
                        'id': row[0],
                        'username': row[1],
                        'rating': row[2],
                        'comment': row[3],
                        'created_at': row[4].isoformat(),
                        'is_admin': row[5],
                        'is_update_maker': row[6],
                        'replies': replies
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'reviews': reviews})
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'add_review':
                username = body.get('username', '').strip()
                rating = body.get('rating', 0)
                comment = body.get('comment', '').strip()
                is_admin = body.get('is_admin', False)
                is_update_maker = body.get('is_update_maker', False)
                
                if not username or not comment:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Username and comment required'})
                    }
                
                if rating < 0 or rating > 5:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Rating must be between 0 and 5'})
                    }
                
                cur.execute("""
                    INSERT INTO reviews (username, rating, comment, is_admin, is_update_maker)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id
                """, (username, rating, comment, is_admin, is_update_maker))
                review_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'review_id': review_id})
                }
            
            elif action == 'add_reply':
                review_id = body.get('review_id')
                username = body.get('username', '').strip()
                reply_text = body.get('reply_text', '').strip()
                is_admin = body.get('is_admin', False)
                is_update_maker = body.get('is_update_maker', False)
                
                if not reply_text:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Reply text required'})
                    }
                
                if is_admin:
                    username = 'Super Bear Adventure RU Community'
                elif is_update_maker:
                    username = 'Update Maker'
                
                cur.execute("""
                    INSERT INTO review_replies (review_id, username, reply_text, is_admin, is_update_maker)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id
                """, (review_id, username, reply_text, is_admin, is_update_maker))
                reply_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'reply_id': reply_id})
                }
            
            elif action == 'delete_review':
                review_id = body.get('review_id')
                is_admin = body.get('is_admin', False)
                
                if not is_admin:
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Only admin can delete reviews'})
                    }
                
                cur.execute("DELETE FROM review_replies WHERE review_id = %s", (review_id,))
                cur.execute("DELETE FROM reviews WHERE id = %s", (review_id,))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True})
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()