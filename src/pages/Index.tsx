import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const REVIEWS_API = 'https://functions.poehali.dev/74380e08-c94c-4888-a7b6-2e95082bd066';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ username: '', rating: 5, comment: '' });
  const [replyTexts, setReplyTexts] = useState<{[key: number]: string}>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUpdateMaker, setIsUpdateMaker] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [updateMakerPassword, setUpdateMakerPassword] = useState('');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [showAchievement, setShowAchievement] = useState<{title: string, description: string} | null>(null);
  
  useEffect(() => {
    loadReviews();
    loadAchievements();
    
    // Трекинг времени на сайте
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeOnSite(elapsed);
      
      // Достижение за 60 минут
      if (elapsed >= 3600 && !achievements.includes('time_60min')) {
        unlockAchievement('time_60min', '⏱️ Исследователь вики!', 'Провели на сайте 60 минут');
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    checkDevReply();
  }, [reviews]);
  
  const loadAchievements = () => {
    const saved = localStorage.getItem('wiki_achievements');
    if (saved) {
      setAchievements(JSON.parse(saved));
    }
  };
  
  const unlockAchievement = (id: string, title: string, description: string) => {
    if (!achievements.includes(id)) {
      const newAchievements = [...achievements, id];
      setAchievements(newAchievements);
      localStorage.setItem('wiki_achievements', JSON.stringify(newAchievements));
      setShowAchievement({ title, description });
      setTimeout(() => setShowAchievement(null), 5000);
    }
  };
  
  const checkDevReply = () => {
    // Проверяем есть ли ответ разработчика пользователю
    const userReviews = reviews.filter(r => !r.is_admin);
    const hasDevReply = userReviews.some(r => 
      r.replies && r.replies.some((reply: any) => reply.is_admin || reply.is_update_maker)
    );
    
    if (hasDevReply && !achievements.includes('dev_reply')) {
      unlockAchievement('dev_reply', '🎮 Признание команды!', 'Разработчик ответил на ваш отзыв!');
    }
  };
  
  const loadReviews = async () => {
    try {
      const response = await fetch(`${REVIEWS_API}?action=get_reviews`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };
  
  const submitReview = async () => {
    let username = newReview.username.trim();
    const comment = newReview.comment.trim();
    
    // Если админ или Update Maker, используем их имена
    if (isAdmin) {
      username = 'Super Bear Adventure RU Community';
    } else if (isUpdateMaker) {
      username = 'Update Maker';
    } else if (!username || !comment) {
      alert('Пожалуйста, заполните имя и комментарий');
      return;
    }
    
    try {
      const response = await fetch(REVIEWS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_review',
          username: username,
          rating: newReview.rating,
          comment: comment,
          is_admin: isAdmin,
          is_update_maker: isUpdateMaker
        })
      });
      
      if (response.ok) {
        setNewReview({ username: '', rating: 5, comment: '' });
        loadReviews();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  
  const submitReply = async (reviewId: number) => {
    const replyText = replyTexts[reviewId]?.trim();
    if (!replyText) return;
    
    let username = 'Гость';
    if (isAdmin) username = 'Super Bear Adventure RU Community';
    if (isUpdateMaker) username = 'Update Maker';
    
    try {
      const response = await fetch(REVIEWS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_reply',
          review_id: reviewId,
          username: username,
          reply_text: replyText,
          is_admin: isAdmin,
          is_update_maker: isUpdateMaker
        })
      });
      
      if (response.ok) {
        setReplyTexts({ ...replyTexts, [reviewId]: '' });
        loadReviews();
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };
  
  const checkAdminPassword = () => {
    if (adminPassword === 'admin2025') {
      setIsAdmin(true);
      setAdminPassword('');
      alert('Вы вошли как администратор!');
    } else {
      alert('Неверный пароль');
    }
  };
  
  const checkUpdateMakerPassword = () => {
    if (updateMakerPassword === 'updatemaker2025') {
      setIsUpdateMaker(true);
      setUpdateMakerPassword('');
      alert('Вы вошли как Update Maker!');
    } else {
      alert('Неверный пароль');
    }
  };

  const characters = [
    { 
      name: 'Медвежонок (Bear)', 
      role: 'Главный герой', 
      description: 'Отважный коричневый медведь, который спасает королевство от фиолетового медведя', 
      icon: '🐻',
      details: 'Прыгает, атакует врагов прыжком сверху, собирает монеты и звезды, разбивает ящики. Главный герой игры, путешествующий по мирам для спасения королевства.'
    },
    { 
      name: 'NPC-медведи', 
      role: 'Жители миров', 
      description: 'Дружелюбные медведи, которые открывают новые локации', 
      icon: '🧸',
      details: 'Открывают доступ к новым мирам за звёзды. Медведи стоят у входов в миры и пропускают игрока при наличии нужного количества звёзд.'
    },
    { 
      name: 'Пчёлы', 
      role: 'Враги', 
      description: 'Агрессивные пчёлы, которые захватили улей и атакуют медвежонка', 
      icon: '🐝',
      details: 'Враги в мире Улей. Летают и жалят медвежонка при приближении. Опасность средняя.'
    },
    { 
      name: 'Зараженные черепахи', 
      role: 'Враги', 
      description: 'Черепахи под влиянием злой силы, враждебны к медвежонку', 
      icon: '🐢',
      details: 'Враги в Черепахограде. Заражены тёмной магией и атакуют главного героя. Опасность средняя.'
    },
    { 
      name: 'Черепаший голем', 
      role: 'Босс', 
      description: 'Босс Черепахограда. Мощный противник из черепах', 
      icon: '🐢',
      details: 'Мир: Черепахоград. Сложность: Легко. Атакуй слабые места, уклоняйся от панцирных атак.'
    },
    { 
      name: 'Йети', 
      role: 'Босс', 
      description: 'Босс Снежной долины. Огромное снежное существо', 
      icon: '🦧',
      details: 'Мир: Снежная долина. Сложность: Средне. Избегай ледяных атак, атакуй когда оглушён.'
    },
    { 
      name: 'Страж', 
      role: 'Босс', 
      description: 'Песчаный босс Пустыни. Каменный страж древних руин', 
      icon: '🗿',
      details: 'Мир: Пустыня. Сложность: Сложно. Уклоняйся от песчаных бурь и атакуй в уязвимые моменты.'
    },
    { 
      name: 'Крыса (Испытуемый 1706)', 
      role: 'Босс', 
      description: 'Босс Гигантского дома. Гигантская крыса из экспериментов', 
      icon: '🐀',
      details: 'Мир: Гигантский дом. Сложность: Очень сложно. Быстрая и опасная. Используй окружение против неё.'
    },
    { 
      name: 'Фиолетовый медведь', 
      role: 'ФИНАЛЬНЫЙ БОСС', 
      description: 'Финальный босс игры! Злой медведь, захвативший королевство пчёл', 
      icon: '🟣',
      details: 'Мир: Улей. Сложность: ФИНАЛЬНЫЙ БОСС. Самый сильный противник. Изучи все его атаки, используй все навыки для победы!'
    },
  ];

  const worlds = [
    { 
      name: 'Медвежья деревня', 
      difficulty: 'Начало', 
      starsNeeded: 0, 
      icon: '🏘️',
      description: 'Стартовая локация, откуда начинается путешествие медвежонка',
      boss: 'Нет'
    },
    { 
      name: 'Черепахоград', 
      difficulty: 'Легко', 
      starsNeeded: 0, 
      icon: '🐢',
      description: 'Первый мир с черепахами и городской архитектурой',
      boss: 'Черепаший голем'
    },
    { 
      name: 'Снежная долина', 
      difficulty: 'Средне', 
      starsNeeded: 8, 
      icon: '❄️',
      description: 'Заснеженный мир с холодом и ледяными врагами',
      boss: 'Йети'
    },
    { 
      name: 'Пустыня', 
      difficulty: 'Сложно', 
      starsNeeded: 16, 
      icon: '🏜️',
      description: 'Жаркий песчаный мир с барханами',
      boss: 'Страж'
    },
    { 
      name: 'Гигантский дом', 
      difficulty: 'Очень сложно', 
      starsNeeded: 24, 
      icon: '🏠',
      description: 'Огромный дом, где медведь выглядит крошечным',
      boss: 'Крыса (Испытуемый 1706)'
    },
    { 
      name: 'Улей', 
      difficulty: 'Финал', 
      starsNeeded: 32, 
      icon: '🐝',
      description: 'Королевство пчёл, захваченное фиолетовым медведем. Финальная локация игры',
      boss: 'Фиолетовый медведь (финальный босс)'
    },
  ];

  const enemies = [
    { 
      name: 'Пчёлы', 
      danger: 'Средняя', 
      description: 'Агрессивные пчёлы, которые захватили улей и атакуют медвежонка', 
      icon: '🐝',
      world: 'Улей'
    },
    { 
      name: 'Зараженные черепахи', 
      danger: 'Средняя', 
      description: 'Черепахи под влиянием злой силы, враждебны к медвежонку', 
      icon: '🐢',
      world: 'Черепахоград'
    },
  ];

  const bosses = [
    {
      name: 'Черепаший голем',
      world: 'Черепахоград',
      icon: '🐢',
      difficulty: 'Легко',
      strategy: 'Босс Черепахограда. Мощный противник из черепах. Атакуй слабые места, уклоняйся от панцирных атак.'
    },
    {
      name: 'Йети',
      world: 'Снежная долина',
      icon: '🦧',
      difficulty: 'Средне',
      strategy: 'Босс Снежной долины. Огромное снежное существо. Избегай ледяных атак, атакуй когда оглушён.'
    },
    {
      name: 'Страж',
      world: 'Пустыня',
      icon: '🗿',
      difficulty: 'Сложно',
      strategy: 'Песчаный босс Пустыни. Каменный страж древних руин. Уклоняйся от песчаных бурь и атакуй в уязвимые моменты.'
    },
    {
      name: 'Крыса (Испытуемый 1706)',
      world: 'Гигантский дом',
      icon: '🐀',
      difficulty: 'Очень сложно',
      strategy: 'Босс Гигантского дома. Гигантская крыса из экспериментов. Быстрая и опасная. Используй окружение против неё.'
    },
    {
      name: 'Фиолетовый медведь',
      world: 'Улей',
      icon: '🟣',
      difficulty: 'ФИНАЛЬНЫЙ БОСС',
      strategy: 'Финальный босс игры! Злой фиолетовый медведь, захвативший королевство пчёл. Самый сильный противник. Изучи все его атаки, используй все навыки для победы!'
    },
  ];

  const secrets = [
    { 
      title: 'Backrooms Easter Egg', 
      icon: '🚪',
      description: 'Секретная жуткая локация с жёлтыми стенами',
      howTo: 'Провались под карту! В определённых местах можно упасть сквозь текстуры и попасть в бесконечный лабиринт Backrooms с монотонным гудением и флуоресцентным освещением.'
    },
    { 
      title: 'Секретный телепорт в Улье', 
      icon: '🌀',
      description: 'Скрытый портал, ведущий к секретному паркуру',
      howTo: 'В мире Улей есть спрятанный телепорт. Найдите его и пройдите сложный секретный паркур для получения особых наград!'
    },
    { 
      title: 'Открытие миров через медведей', 
      icon: '⭐',
      description: 'Медведи-NPC открывают доступ к новым локациям за звёзды',
      howTo: 'У входа в каждый мир стоит медведь-NPC. Он пропустит тебя при наличии звёзд: Черепахоград - 0, Снежная долина - 8, Пустыня - 16, Гигантский дом - 24, Улей - 32 звезды!'
    },
    { 
      title: 'Золотые монеты', 
      icon: '🪙',
      description: 'Редкие коллекционные монеты для 100% прохождения',
      howTo: 'На каждом уровне есть золотые монеты в труднодоступных местах. Требуют точных прыжков и секретных путей.'
    },
  ];

  const guides = [
    { 
      title: 'Управление и способности', 
      content: 'Джойстик/WASD - движение. Кнопка прыжка - прыжок сверху убивает врагов. Разбивай ящики и бочки для получения монет. Звёзды нужны для открытия новых миров через мишек-NPC.'
    },
    { 
      title: 'Система открытия миров', 
      content: 'Медведи-NPC стоят у входов в миры и открывают их за звёзды: Черепахоград (0), Снежная долина (8), Пустыня (16), Гигантский дом (24), Улей (32). Собирайте звёзды чтобы медведи пропустили вас дальше!'
    },
    { 
      title: 'Победа над боссами', 
      content: 'В каждом мире есть босс: Черепаший голем (Черепахоград), Йети (Снежная долина), Страж (Пустыня), Крыса-Испытуемый 1706 (Гигантский дом), Фиолетовый медведь (Улей - финал). Изучайте паттерны атак каждого босса!'
    },
    { 
      title: 'Поиск секретов и Backrooms', 
      content: 'Проваливайтесь под карту для доступа в Backrooms. В Улье ищите секретный телепорт к паркуру. Исследуйте каждый уголок для поиска золотых монет и секретов!'
    },
    {
      title: 'Прохождение миров по порядку',
      content: 'Начните с Медвежьей деревни. Пройдите Черепахоград (1 мир), соберите 8 звёзд для Снежной долины (2 мир), 16 для Пустыни (3 мир), 24 для Гигантского дома (4 мир), 32 для финала в Улье (5 мир).'
    },
  ];

  const faq = [
    { q: 'Кто разработчик игры?', a: 'Игру Super Bear Adventure разработала инди-студия Earthkwak Games.' },
    { q: 'Кто создал этот сайт?', a: 'Этот вики-сайт создало сообщество Super Bear Adventure RU Community - русскоязычные фанаты игры!' },
    { q: 'На каких платформах доступна игра?', a: 'Игра доступна на Android (Google Play), iOS (App Store) и Nintendo Switch (eShop).' },
    { q: 'Сколько миров в игре?', a: 'В игре 6 локаций: Медвежья деревня (начало), Черепахоград, Снежная долина, Пустыня, Гигантский дом и финальный Улей.' },
    { q: 'Как найти Backrooms?', a: 'Провалитесь под карту! В определённых местах можно упасть сквозь текстуры и попасть в жуткий лабиринт Backrooms.' },
    { q: 'Как открываются миры?', a: 'Медведи-NPC открывают доступ к мирам за звёзды: Черепахоград - 0, Снежная долина - 8, Пустыня - 16, Гигантский дом - 24, Улей - 32 звезды.' },
    { q: 'Кто финальный босс?', a: 'Фиолетовый медведь в мире Улей - злодей, захвативший королевство пчёл!' },
    { q: 'Есть ли секретные костюмы?', a: 'Нет, в игре нет секретных костюмов.' },
    { q: 'Где секретный телепорт?', a: 'В Улье есть скрытый телепорт, который приводит к секретному паркуру!' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Начало': return 'bg-blue-500';
      case 'Легко': return 'bg-green-500';
      case 'Средне': return 'bg-yellow-500';
      case 'Сложно': return 'bg-orange-500';
      case 'Очень сложно': return 'bg-red-500';
      case 'Финал': return 'bg-purple-600';
      case 'ФИНАЛЬНЫЙ БОСС': return 'bg-purple-700';
      default: return 'bg-gray-500';
    }
  };

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'Низкая': return 'bg-green-500';
      case 'Средняя': return 'bg-yellow-500';
      case 'Высокая': return 'bg-orange-500';
      case 'Очень высокая': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://cdn.poehali.dev/projects/cfd9966b-a86b-4915-bb4d-b9ebe9a97be6/files/817798a4-d2af-4fd4-9796-b77425d942ba.jpg" 
              alt="Super Bear Adventure Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end justify-center pb-6">
              <div className="text-8xl animate-bounce-subtle">🐻</div>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4 drop-shadow-lg">
            Super Bear Adventure <span className="text-3xl text-red-500">(мега обновление бета тест)</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Полная русская энциклопедия игры
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2 mb-2">
            Разработчик игры: Earthkwak Games
          </Badge>
          <br />
          <Badge variant="outline" className="text-sm px-4 py-2 mt-2">
            Создатель сайта: Super Bear Adventure RU Community
          </Badge>
        </header>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full animate-scale-in">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2 mb-8 h-auto p-2 bg-card/50 backdrop-blur">
            <TabsTrigger value="about" className="flex items-center gap-2 py-3">
              <Icon name="Info" size={20} />
              <span className="hidden sm:inline">О игре</span>
            </TabsTrigger>
            <TabsTrigger value="characters" className="flex items-center gap-2 py-3">
              <Icon name="Users" size={20} />
              <span className="hidden sm:inline">Персонажи</span>
            </TabsTrigger>
            <TabsTrigger value="worlds" className="flex items-center gap-2 py-3">
              <Icon name="Map" size={20} />
              <span className="hidden sm:inline">Миры</span>
            </TabsTrigger>
            <TabsTrigger value="enemies" className="flex items-center gap-2 py-3">
              <Icon name="Bug" size={20} />
              <span className="hidden sm:inline">Враги</span>
            </TabsTrigger>
            <TabsTrigger value="secrets" className="flex items-center gap-2 py-3">
              <Icon name="Key" size={20} />
              <span className="hidden sm:inline">Секреты</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2 py-3">
              <Icon name="BookOpen" size={20} />
              <span className="hidden sm:inline">Гайды</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="animate-fade-in">
            <Card className="border-2 border-primary/20 shadow-xl mb-6">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="Gamepad2" size={32} className="text-primary" />
                  О игре Super Bear Adventure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <p>
                  <strong>Super Bear Adventure</strong> — это яркий 3D-платформер от студии <strong>Earthkwak Games</strong>, 
                  вдохновлённый классическими играми вроде Super Mario 64, Banjo-Kazooie и Crash Bandicoot.
                </p>
                <p>
                  Управляйте отважным медвежонком, который отправился спасать королевство пчёл от злого <strong>фиолетового медведя</strong>! 
                  Исследуйте миры, собирайте звёзды, побеждайте боссов и раскрывайте секреты, включая жуткий Backrooms!
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-primary/5 border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Star" size={24} className="text-primary" />
                        Основные особенности
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>6 уникальных миров для исследования</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Система открытия миров через звёзды</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>5 эпичных боссов включая финального</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Секретная локация Backrooms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Секретный телепорт к паркуру в Улье</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Золотые монеты для коллекционеров</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5 border-secondary/30">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Trophy" size={24} className="text-secondary" />
                        Сюжет
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">
                        Злой <strong>фиолетовый медведь</strong> захватил королевство пчёл в Улье! 
                      </p>
                      <p className="mb-3">
                        Отважный медвежонок отправляется в путешествие через миры: от Черепахограда до Снежной долины, 
                        через Пустыню и Гигантский дом, чтобы собрать силы и победить злодея!
                      </p>
                      <p>
                        Собирайте звёзды, открывайте новые миры через мишек-NPC и спасайте королевство!
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-accent/5 border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Icon name="Users" size={24} className="text-accent" />
                      О разработчике и сообществе
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>
                      <strong>🎮 Разработчик: Earthkwak Games</strong><br />
                      Независимая студия, создавшая этот замечательный 3D-платформер в духе классических игр 90-х и 2000-х годов.
                    </p>
                    <p>
                      <strong>🌐 Создатель сайта: Super Bear Adventure RU Community</strong><br />
                      Русскоязычное фан-сообщество игры! Мы собрали всю информацию об игре: секреты, пасхалки, гайды и прохождение.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-500/10 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Icon name="Download" size={24} className="text-purple-500" />
                      Где скачать игру
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-2xl">📱</span>
                        <span><strong>Android:</strong> Google Play Store (бесплатно)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-2xl">🍎</span>
                        <span><strong>iOS:</strong> App Store (бесплатно)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-2xl">🎮</span>
                        <span><strong>Nintendo Switch:</strong> Nintendo eShop</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="HelpCircle" size={32} className="text-primary" />
                  Часто задаваемые вопросы (FAQ)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faq.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="characters" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {characters.map((character, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-primary/20">
                  <CardHeader>
                    <div className="text-6xl mb-4 text-center">{character.icon}</div>
                    <CardTitle className="text-2xl text-center">{character.name}</CardTitle>
                    <CardDescription className="text-center">
                      <Badge variant="secondary">{character.role}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-center font-medium">{character.description}</p>
                    <p className="text-sm text-muted-foreground text-center">{character.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="worlds" className="animate-fade-in space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {worlds.map((world, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-secondary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-5xl">{world.icon}</div>
                      <Badge className={`${getDifficultyColor(world.difficulty)} text-white`}>
                        {world.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{world.name}</CardTitle>
                    <CardDescription>{world.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size={20} className="text-yellow-500" />
                      <span className="text-sm font-semibold">Медведь открывает за: {world.starsNeeded} {world.starsNeeded === 1 ? 'звезду' : world.starsNeeded < 5 ? 'звезды' : 'звёзд'}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        <strong>Босс:</strong> {world.boss}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-destructive/30">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Icon name="Skull" size={28} className="text-destructive" />
                  Боссы миров
                </CardTitle>
                <CardDescription>Эпичные битвы в конце каждого мира</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {bosses.map((boss, index) => (
                    <Card key={index} className="bg-destructive/5 border-destructive/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="text-4xl">{boss.icon}</div>
                          <Badge className={`${getDifficultyColor(boss.difficulty)} text-white`}>
                            {boss.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{boss.name}</CardTitle>
                        <CardDescription className="text-xs">{boss.world}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          <strong>Информация:</strong> {boss.strategy}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enemies" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {enemies.map((enemy, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-destructive/20">
                  <CardHeader>
                    <div className="text-6xl mb-4 text-center">{enemy.icon}</div>
                    <CardTitle className="text-xl text-center">{enemy.name}</CardTitle>
                    <CardDescription className="text-center space-y-2">
                      <div>
                        <Badge className={`${getDangerColor(enemy.danger)} text-white`}>
                          Опасность: {enemy.danger}
                        </Badge>
                      </div>
                      <div>
                        <Badge variant="outline">
                          Мир: {enemy.world}
                        </Badge>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm">{enemy.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="secrets" className="animate-fade-in">
            <div className="space-y-6">
              {secrets.map((secret, index) => (
                <Card key={index} className="border-2 border-accent/20 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <span className="text-3xl">{secret.icon}</span>
                      {secret.title}
                    </CardTitle>
                    <CardDescription className="text-base">{secret.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Lightbulb" size={18} className="text-accent" />
                        Как найти:
                      </p>
                      <p className="text-sm text-muted-foreground">{secret.howTo}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="animate-fade-in">
            <div className="space-y-6">
              {guides.map((guide, index) => (
                <Card key={index} className="border-2 border-primary/20 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Icon name="BookMarked" size={28} className="text-primary" />
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed">{guide.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 animate-fade-in">
          <Card className="border-2 border-accent/30 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-3">
                <Icon name="MessageSquare" size={32} className="text-accent" />
                Отзывы о вики-сайте
              </CardTitle>
              <CardDescription>Оцените наш сайт и оставьте комментарий!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-semibold mb-4">Оставить отзыв</h3>
                <div className="space-y-4">
                  {!isAdmin && !isUpdateMaker && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ваш никнейм</label>
                      <Input
                        placeholder="Введите никнейм"
                        value={newReview.username}
                        onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                      />
                    </div>
                  )}
                  
                  {(isAdmin || isUpdateMaker) && (
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/30">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Icon name="User" size={18} />
                        Вы пишете от имени: <span className="text-primary">
                          {isAdmin ? 'Super Bear Adventure RU Community' : 'Update Maker'}
                        </span>
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Оценка (0-5 звёзд)</label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`text-3xl transition-transform hover:scale-110 ${
                            star <= newReview.rating ? 'opacity-100' : 'opacity-30'
                          }`}
                        >
                          ⭐
                        </button>
                      ))}
                      <span className="ml-2 text-lg font-semibold self-center">
                        {newReview.rating} / 5
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Как вам вики-сайт? Есть вопросы?
                    </label>
                    <Textarea
                      placeholder="Ваш комментарий..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                    />
                  </div>
                  
                  <Button onClick={submitReview} className="w-full">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить отзыв
                  </Button>
                </div>
              </div>

              {!isAdmin && !isUpdateMaker && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                    <label className="text-sm font-medium mb-2 block">Вход для администратора</label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        placeholder="Пароль"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                      <Button onClick={checkAdminPassword} variant="secondary">
                        Войти
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                    <label className="text-sm font-medium mb-2 block">Вход для Update Maker</label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        placeholder="Пароль"
                        value={updateMakerPassword}
                        onChange={(e) => setUpdateMakerPassword(e.target.value)}
                      />
                      <Button onClick={checkUpdateMakerPassword} variant="secondary">
                        Войти
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {isAdmin && (
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                    <Icon name="ShieldCheck" size={18} />
                    Вы вошли как: Super Bear Adventure RU Community (Разработчик сайта)
                  </p>
                </div>
              )}
              
              {isUpdateMaker && (
                <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                    <Icon name="Zap" size={18} />
                    Вы вошли как: Update Maker (Official Update Maker)
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Все отзывы ({reviews.length})</h3>
                
                {reviews.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Пока нет отзывов. Будьте первым!
                  </p>
                )}
                
                {reviews.map((review) => (
                  <Card key={review.id} className="border-2 border-secondary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {review.username}
                            {review.is_admin && (
                              <Badge variant="secondary" className="text-xs">
                                Разработчик сайта
                              </Badge>
                            )}
                            {review.is_update_maker && (
                              <Badge variant="destructive" className="text-xs">
                                Official Update Maker
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {new Date(review.created_at).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </CardDescription>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? 'opacity-100' : 'opacity-30'}>
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-base">{review.comment}</p>
                      
                      {review.replies && review.replies.length > 0 && (
                        <div className="ml-6 space-y-3 border-l-2 border-accent/30 pl-4">
                          {review.replies.map((reply: any) => (
                            <div key={reply.id} className="bg-accent/5 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-sm">{reply.username}</span>
                                {reply.is_admin && (
                                  <Badge variant="secondary" className="text-xs">
                                    Разработчик сайта
                                  </Badge>
                                )}
                                {reply.is_update_maker && (
                                  <Badge variant="destructive" className="text-xs">
                                    Official Update Maker
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {new Date(reply.created_at).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p className="text-sm">{reply.reply_text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Input
                          placeholder="Написать ответ..."
                          value={replyTexts[review.id] || ''}
                          onChange={(e) => setReplyTexts({ ...replyTexts, [review.id]: e.target.value })}
                        />
                        <Button onClick={() => submitReply(review.id)} size="sm">
                          <Icon name="Reply" size={16} className="mr-1" />
                          Ответить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {achievements.length > 0 && (
          <Card className="mt-8 border-2 border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Icon name="Trophy" size={28} className="text-yellow-500" />
                Ваши достижения ({achievements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.includes('time_60min') && (
                  <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">⏱️</span>
                      <div>
                        <p className="font-semibold">Исследователь вики!</p>
                        <p className="text-sm text-muted-foreground">Провели на сайте 60 минут</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {achievements.includes('dev_reply') && (
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🎮</span>
                      <div>
                        <p className="font-semibold">Признание команды!</p>
                        <p className="text-sm text-muted-foreground">Разработчик ответил на ваш отзыв</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>⏱️ Вы на сайте: {Math.floor(timeOnSite / 60)} мин {timeOnSite % 60} сек</p>
              </div>
            </CardContent>
          </Card>
        )}

        {showAchievement && (
          <div className="fixed top-4 right-4 z-50 animate-fade-in">
            <Card className="border-2 border-yellow-500 shadow-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Trophy" size={24} className="text-yellow-500" />
                  Достижение разблокировано!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{showAchievement.title}</p>
                <p className="text-sm text-muted-foreground">{showAchievement.description}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <footer className="mt-8 text-center text-muted-foreground animate-fade-in space-y-2">
          <p className="text-sm">
            🎮 <strong>Super Bear Adventure</strong> © Earthkwak Games
          </p>
          <p className="text-sm">
            🌐 Вики-сайт создан сообществом <strong>Super Bear Adventure RU Community</strong>
          </p>
          <p className="text-xs">
            Неофициальная фанатская энциклопедия · Все секреты, гайды и пасхалки в одном месте!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;