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
      description: 'Отважный коричневый медведь, который спасает королевство от фиолетового медведя', 
      icon: '🐻',
      details: 'Прыгает, атакует врагов прыжком сверху, собирает монеты и звезды, разбивает ящики. Главный герой игры, путешествующий по мирам для спасения королевства.'
    },
    { 
      name: 'NPC-медведи', 
      role: 'Жители миров', 
      description: 'Дружелюбные медведи, которые открывают новые локации', 
      icon: '🧸',
      details: 'Помогают открывать миры. Нужно собрать определённое количество звёзд, чтобы мишки открыли доступ к новым локациям.'
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
      title: 'Разблокировка миров через звёзды', 
      icon: '⭐',
      description: 'Мишки открывают доступ к новым локациям',
      howTo: 'Черепахоград - 0 звёзд, Снежная долина - 8 звёзд, Пустыня - 16 звёзд, Гигантский дом - 24 звезды, Улей - 32 звезды. Собирайте звёзды чтобы мишки открывали новые миры!'
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
      content: 'Мишки открывают доступ к локациям при определённом количестве звёзд: Черепахоград (0), Снежная долина (8), Пустыня (16), Гигантский дом (24), Улей (32). Собирайте звёзды в предыдущих мирах для прогресса!'
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
    { q: 'Сколько звёзд нужно для открытия миров?', a: 'Черепахоград - 0, Снежная долина - 8, Пустыня - 16, Гигантский дом - 24, Улей - 32 звезды.' },
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
            Super Bear Adventure
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
                      <span className="text-sm font-semibold">Нужно звёзд: {world.starsNeeded}</span>
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

        <footer className="mt-16 text-center text-muted-foreground animate-fade-in space-y-2">
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
