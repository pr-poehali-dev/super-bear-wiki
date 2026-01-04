import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');

  const characters = [
    { name: 'Медвежонок', role: 'Главный герой', description: 'Смелый и отважный медвежонок, который отправляется в невероятное приключение', icon: '🐻' },
    { name: 'Король', role: 'Правитель', description: 'Мудрый король, который нуждается в помощи героя', icon: '👑' },
    { name: 'Волшебник', role: 'Наставник', description: 'Могущественный маг, помогающий медвежонку в путешествии', icon: '🧙' },
  ];

  const levels = [
    { name: 'Лесная долина', difficulty: 'Легко', coins: 50, icon: '🌲' },
    { name: 'Горный перевал', difficulty: 'Средне', coins: 75, icon: '⛰️' },
    { name: 'Ледяная пещера', difficulty: 'Сложно', coins: 100, icon: '❄️' },
    { name: 'Вулканический остров', difficulty: 'Очень сложно', coins: 150, icon: '🌋' },
  ];

  const enemies = [
    { name: 'Злая пчела', danger: 'Низкая', description: 'Летает и атакует с воздуха', icon: '🐝' },
    { name: 'Колючий ёж', danger: 'Средняя', description: 'Катится и наносит урон при касании', icon: '🦔' },
    { name: 'Огненный дракон', danger: 'Высокая', description: 'Босс, дышит огнём', icon: '🐉' },
  ];

  const guides = [
    { title: 'Как собирать монеты', content: 'Монеты спрятаны по всем уровням. Исследуйте каждый уголок карты и проверяйте секретные проходы!' },
    { title: 'Прыжки и движение', content: 'Используйте двойной прыжок для достижения высоких платформ. Зажмите кнопку бега для ускорения.' },
    { title: 'Победа над боссами', content: 'Изучайте паттерны атак боссов. Уворачивайтесь от атак и атакуйте в уязвимые моменты.' },
  ];

  const faq = [
    { q: 'Как сохранить прогресс?', a: 'Игра автоматически сохраняет прогресс после прохождения каждого уровня.' },
    { q: 'Сколько всего уровней?', a: 'В игре более 30 уникальных уровней в различных локациях.' },
    { q: 'Можно ли играть оффлайн?', a: 'Да, игра полностью работает без подключения к интернету.' },
    { q: 'Как разблокировать секретные уровни?', a: 'Соберите все звёзды на обычных уровнях для доступа к бонусным.' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return 'bg-green-500';
      case 'Средне': return 'bg-yellow-500';
      case 'Сложно': return 'bg-orange-500';
      case 'Очень сложно': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'Низкая': return 'bg-green-500';
      case 'Средняя': return 'bg-yellow-500';
      case 'Высокая': return 'bg-red-500';
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
            Super Bear Adventure
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Энциклопедия приключений
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Разработчик: Super Bear Adventure RUS
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
            <TabsTrigger value="levels" className="flex items-center gap-2 py-3">
              <Icon name="Map" size={20} />
              <span className="hidden sm:inline">Уровни</span>
            </TabsTrigger>
            <TabsTrigger value="enemies" className="flex items-center gap-2 py-3">
              <Icon name="Skull" size={20} />
              <span className="hidden sm:inline">Враги</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2 py-3">
              <Icon name="BookOpen" size={20} />
              <span className="hidden sm:inline">Гайды</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2 py-3">
              <Icon name="HelpCircle" size={20} />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="animate-fade-in">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="Gamepad2" size={32} className="text-primary" />
                  О игре
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <p>
                  <strong>Super Bear Adventure</strong> — это захватывающий 3D-платформер, где вы играете за отважного медвежонка, 
                  отправляющегося в эпическое приключение через красочные миры!
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-primary/5 border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Star" size={24} className="text-primary" />
                        Особенности
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Более 30 уникальных уровней</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Разнообразные враги и боссы</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Сбор монет и секретов</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Красочная графика</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5 border-secondary/30">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Trophy" size={24} className="text-secondary" />
                        Цель игры
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Помогите медвежонку спасти королевство от тёмных сил! 
                        Путешествуйте через леса, горы, пещеры и другие удивительные локации. 
                        Собирайте монеты, находите секреты и побеждайте могущественных боссов!
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-accent/5 border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Icon name="Sparkles" size={24} className="text-accent" />
                      О разработчике
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Super Bear Adventure RUS</strong> — команда увлечённых разработчиков, 
                      создающих качественные игры для всей семьи. Мы стремимся создавать яркие, 
                      весёлые и запоминающиеся приключения!
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="characters" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-primary/20">
                  <CardHeader>
                    <div className="text-6xl mb-4 text-center">{character.icon}</div>
                    <CardTitle className="text-2xl text-center">{character.name}</CardTitle>
                    <CardDescription className="text-center">
                      <Badge variant="secondary">{character.role}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">{character.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="levels" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {levels.map((level, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-secondary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-5xl">{level.icon}</div>
                      <Badge className={`${getDifficultyColor(level.difficulty)} text-white`}>
                        {level.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{level.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={24} className="text-yellow-500" />
                        <span className="text-lg font-semibold">{level.coins} монет</span>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        Уровень {index + 1}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enemies" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enemies.map((enemy, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-destructive/20">
                  <CardHeader>
                    <div className="text-6xl mb-4 text-center">{enemy.icon}</div>
                    <CardTitle className="text-2xl text-center">{enemy.name}</CardTitle>
                    <CardDescription className="text-center">
                      <Badge className={`${getDangerColor(enemy.danger)} text-white`}>
                        Опасность: {enemy.danger}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">{enemy.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="animate-fade-in">
            <div className="space-y-6">
              {guides.map((guide, index) => (
                <Card key={index} className="border-2 border-accent/20 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Icon name="Lightbulb" size={28} className="text-accent" />
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">{guide.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="animate-fade-in">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="MessageCircleQuestion" size={32} className="text-primary" />
                  Часто задаваемые вопросы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
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
        </Tabs>

        <footer className="mt-16 text-center text-muted-foreground animate-fade-in">
          <p className="text-sm">
            © 2024 Super Bear Adventure RUS. Неофициальная вики-энциклопедия фанатов игры.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;