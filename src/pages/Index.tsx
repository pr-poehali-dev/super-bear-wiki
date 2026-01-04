import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');

  const characters = [
    { 
      name: 'Медвежонок (Bear)', 
      role: 'Главный герой', 
      description: 'Отважный медвежонок, который спасает королевство пчёл от злого фиолетового медведя', 
      icon: '🐻',
      details: 'Умеет прыгать, атаковать врагов и собирать монеты по всему королевству'
    },
    { 
      name: 'Фиолетовый Медведь (Purple Bear)', 
      role: 'Главный антагонист', 
      description: 'Злой медведь, захвативший королевство пчёл и похитивший принцессу', 
      icon: '🟣',
      details: 'Финальный босс игры, обитает в своей крепости'
    },
    { 
      name: 'Принцесса пчёл', 
      role: 'Персонаж для спасения', 
      description: 'Правительница королевства пчёл, похищенная злодеем', 
      icon: '👸',
      details: 'Главная цель героя - спасти её из плена'
    },
    { 
      name: 'Пчёлы (Bees)', 
      role: 'Жители королевства', 
      description: 'Дружелюбные существа, населяющие королевство', 
      icon: '🐝',
      details: 'Нуждаются в помощи медвежонка для спасения своего дома'
    },
  ];

  const worlds = [
    { 
      name: 'Bear Kingdom', 
      difficulty: 'Легко', 
      coins: 120, 
      icon: '🏰',
      description: 'Стартовый мир с основными механиками игры',
      levels: 6
    },
    { 
      name: 'Bee Kingdom', 
      difficulty: 'Средне', 
      coins: 150, 
      icon: '🐝',
      description: 'Королевство пчёл, захваченное фиолетовым медведем',
      levels: 8
    },
    { 
      name: 'Dragon Land', 
      difficulty: 'Сложно', 
      coins: 180, 
      icon: '🐉',
      description: 'Опасная земля драконов с лавой и огнём',
      levels: 7
    },
    { 
      name: 'Ice World', 
      difficulty: 'Сложно', 
      coins: 200, 
      icon: '❄️',
      description: 'Ледяной мир со скользкими платформами',
      levels: 8
    },
    { 
      name: 'Castle of Purple Bear', 
      difficulty: 'Очень сложно', 
      coins: 250, 
      icon: '🏯',
      description: 'Крепость главного злодея - финальная локация',
      levels: 5
    },
  ];

  const enemies = [
    { name: 'Слизни (Slimes)', danger: 'Низкая', description: 'Базовые враги, медленно передвигаются', icon: '🟢' },
    { name: 'Ежи (Hedgehogs)', danger: 'Средняя', description: 'Колючие враги, опасны при касании', icon: '🦔' },
    { name: 'Пауки (Spiders)', danger: 'Средняя', description: 'Спускаются с потолка на паутине', icon: '🕷️' },
    { name: 'Летучие мыши (Bats)', danger: 'Средняя', description: 'Летают по определённым траекториям', icon: '🦇' },
    { name: 'Огненные существа', danger: 'Высокая', description: 'Обитают в Dragon Land, наносят огненный урон', icon: '🔥' },
    { name: 'Ледяные враги', danger: 'Высокая', description: 'Враги из Ice World, замораживают платформы', icon: '🧊' },
    { name: 'Боссы миров', danger: 'Очень высокая', description: 'Уникальные боссы в конце каждого мира', icon: '👹' },
    { name: 'Purple Bear (Босс)', danger: 'Максимальная', description: 'Финальный босс игры с несколькими фазами атак', icon: '🟣' },
  ];

  const secrets = [
    { 
      title: 'Backrooms (Закулисье)', 
      icon: '🚪',
      description: 'Секретная локация, доступная через скрытые порталы',
      howTo: 'Найдите жёлтые стены в некоторых уровнях и пройдите сквозь них. Приведёт в жуткое бесконечное пространство с лимонально-жёлтыми стенами.'
    },
    { 
      title: 'Секретные телепорты', 
      icon: '🌀',
      description: 'Скрытые порталы ведут к бонусным локациям',
      howTo: 'Ищите невидимые проходы в стенах и подозрительные места на картах. Некоторые телепорты спрятаны за фальшивыми стенами.'
    },
    { 
      title: 'Золотые монеты', 
      icon: '🪙',
      description: 'Коллекционные предметы для 100% прохождения',
      howTo: 'На каждом уровне спрятаны золотые монеты. Некоторые требуют сложных прыжков или решения головоломок.'
    },
    { 
      title: 'Секретные костюмы', 
      icon: '👕',
      description: 'Разблокируемые скины для медвежонка',
      howTo: 'Соберите все монеты в мире или выполните особые условия для получения новых костюмов.'
    },
    { 
      title: 'Пасхалки про другие игры', 
      icon: '🎮',
      description: 'Отсылки к популярным играм',
      howTo: 'В игре спрятаны пасхалки на Mario, Sonic и другие платформеры. Ищите необычные объекты!'
    },
  ];

  const guides = [
    { 
      title: 'Управление и движение', 
      content: 'Используйте джойстик/клавиши для движения. Прыжок - кнопка A/пробел. Двойной прыжок доступен после апгрейда. Атака - кнопка B. Медвежонок может разбивать ящики и атаковать врагов сверху.'
    },
    { 
      title: 'Сбор монет и звёзд', 
      content: 'Собирайте жёлтые монеты для покупок и прогресса. Звёзды открывают новые миры. Золотые монеты - для коллекционеров 100% прохождения. Обязательно исследуйте каждый уголок уровня!'
    },
    { 
      title: 'Победа над боссами', 
      content: 'У каждого босса свои паттерны атак. Изучите их движения, уклоняйтесь и атакуйте в уязвимые моменты. Фиолетовый медведь имеет 3 фазы - будьте готовы к долгому бою!'
    },
    { 
      title: 'Поиск секретов', 
      content: 'Проверяйте подозрительные стены - некоторые можно пройти насквозь. Backrooms скрыт за жёлтыми стенами. Используйте длинный прыжок для достижения далёких платформ.'
    },
  ];

  const faq = [
    { q: 'Кто разработчик игры?', a: 'Игру Super Bear Adventure разработала студия Earthkwak Games.' },
    { q: 'На каких платформах доступна игра?', a: 'Игра доступна на Android, iOS и Nintendo Switch.' },
    { q: 'Сколько всего миров в игре?', a: 'В игре 5 основных миров: Bear Kingdom, Bee Kingdom, Dragon Land, Ice World и Castle of Purple Bear, плюс секретные локации.' },
    { q: 'Как найти Backrooms?', a: 'Ищите жёлтые стены на некоторых уровнях - пройдите сквозь них, чтобы попасть в секретную локацию Backrooms.' },
    { q: 'Можно ли играть оффлайн?', a: 'Да, игра полностью работает без подключения к интернету.' },
    { q: 'Есть ли многопользовательский режим?', a: 'Нет, Super Bear Adventure - это однопользовательская приключенческая игра.' },
    { q: 'Как победить Purple Bear?', a: 'Изучите его паттерны атак в каждой из 3 фаз. Уклоняйтесь от фиолетовых снарядов и атакуйте, когда он уязвим после атаки.' },
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
      case 'Высокая': return 'bg-orange-500';
      case 'Очень высокая': return 'bg-red-500';
      case 'Максимальная': return 'bg-purple-600';
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
            Полная энциклопедия игры
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
              <Icon name="Skull" size={20} />
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
                  <strong>Super Bear Adventure</strong> — это захватывающий 3D-платформер, разработанный студией <strong>Earthkwak Games</strong>. 
                  В игре вы управляете отважным медвежонком, который отправляется в эпическое приключение, чтобы спасти королевство пчёл 
                  от злого фиолетового медведя и освободить похищенную принцессу!
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
                          <span>5 уникальных миров с десятками уровней</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Эпичные битвы с боссами</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Сотни монет и секретов для коллекционирования</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Красочная 3D графика</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Секретные локации (Backrooms!)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Разблокируемые костюмы</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5 border-secondary/30">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Scroll" size={24} className="text-secondary" />
                        Сюжет
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">
                        Злой <strong>Фиолетовый Медведь</strong> захватил королевство пчёл и похитил их принцессу! 
                      </p>
                      <p className="mb-3">
                        Только отважный медвежонок может остановить злодея. Путешествуйте через пять миров, 
                        сражайтесь с врагами, собирайте монеты и спасите королевство!
                      </p>
                      <p>
                        Финальная битва ждёт вас в замке фиолетового медведя...
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
                      <strong>🎮 Разработчик игры: Earthkwak Games</strong><br />
                      Независимая студия, создавшая этот замечательный 3D-платформер для мобильных устройств и Nintendo Switch.
                    </p>
                    <p>
                      <strong>🌐 Создатель сайта: Super Bear Adventure RU Community</strong><br />
                      Русскоязычное сообщество фанатов игры, собравшее всю информацию о Super Bear Adventure в одном месте!
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-500/10 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Icon name="Download" size={24} className="text-purple-500" />
                      Где скачать
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-2xl">📱</span>
                        <span><strong>Android:</strong> Google Play Store</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-2xl">🍎</span>
                        <span><strong>iOS:</strong> App Store</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-2xl">🎮</span>
                        <span><strong>Nintendo Switch:</strong> eShop</span>
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

          <TabsContent value="worlds" className="animate-fade-in">
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={20} className="text-yellow-500" />
                        <span className="text-sm font-semibold">{world.coins} монет</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {world.levels} уровней
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
                    <CardTitle className="text-xl text-center">{enemy.name}</CardTitle>
                    <CardDescription className="text-center">
                      <Badge className={`${getDangerColor(enemy.danger)} text-white`}>
                        {enemy.danger}
                      </Badge>
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

        <footer className="mt-16 text-center text-muted-foreground animate-fade-in space-y-2">
          <p className="text-sm">
            🎮 <strong>Super Bear Adventure</strong> © Earthkwak Games
          </p>
          <p className="text-sm">
            🌐 Вики-сайт создан <strong>Super Bear Adventure RU Community</strong>
          </p>
          <p className="text-xs">
            Неофициальная фанатская энциклопедия игры · 2024
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
