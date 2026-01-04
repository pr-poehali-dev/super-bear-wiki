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
      description: 'Отважный коричневый медведь с красным шарфом, отправившийся на поиски монет', 
      icon: '🐻',
      details: 'Прыгает, атакует врагов прыжком сверху, собирает монеты и звезды, разбивает ящики'
    },
    { 
      name: 'NPC-медведи', 
      role: 'Жители миров', 
      description: 'Дружелюбные медведи, которые дают квесты и подсказки', 
      icon: '🧸',
      details: 'Помогают герою, дают задания на сбор монет и открытие новых областей'
    },
    { 
      name: 'Жёлтая птичка', 
      role: 'Компаньон', 
      description: 'Летающая птичка, которая иногда помогает медвежонку', 
      icon: '🐤',
      details: 'Даёт подсказки и указывает направление'
    },
  ];

  const worlds = [
    { 
      name: 'Green Hills (Зелёные холмы)', 
      difficulty: 'Легко', 
      coins: 100, 
      icon: '🌳',
      description: 'Стартовая локация с лесами, полянами и простыми врагами',
      levels: 8,
      boss: 'Гигантская божья коровка'
    },
    { 
      name: 'Sandy Beach (Песчаный пляж)', 
      difficulty: 'Средне', 
      coins: 120, 
      icon: '🏖️',
      description: 'Тропический мир с пальмами, водой и крабами',
      levels: 10,
      boss: 'Огромный краб'
    },
    { 
      name: 'Snowy Mountains (Снежные горы)', 
      difficulty: 'Сложно', 
      coins: 150, 
      icon: '🏔️',
      description: 'Заснеженные вершины со скользким льдом и снеговиками',
      levels: 12,
      boss: 'Ледяной голем'
    },
    { 
      name: 'Volcano Island (Вулканический остров)', 
      difficulty: 'Очень сложно', 
      coins: 180, 
      icon: '🌋',
      description: 'Огненный мир с лавой, огненными врагами и взрывающимися бомбами',
      levels: 14,
      boss: 'Лавовый дракон'
    },
    { 
      name: 'Sky Kingdom (Небесное королевство)', 
      difficulty: 'Максимально', 
      coins: 200, 
      icon: '☁️',
      description: 'Летающие острова в облаках с опасными платформами',
      levels: 16,
      boss: 'Гигантский орёл'
    },
    { 
      name: 'Cave System (Система пещер)', 
      difficulty: 'Сложно', 
      coins: 140, 
      icon: '🕳️',
      description: 'Тёмные пещеры с кристаллами, летучими мышами и секретными проходами',
      levels: 11,
      boss: 'Каменный голем'
    },
  ];

  const enemies = [
    { name: 'Божьи коровки', danger: 'Низкая', description: 'Медленно ползают по земле, легко побеждаются', icon: '🐞' },
    { name: 'Жуки-носороги', danger: 'Средняя', description: 'Заряжают и таранят медведя, нужно прыгать в нужный момент', icon: '🪲' },
    { name: 'Крабы', danger: 'Средняя', description: 'Двигаются из стороны в сторону на пляжах', icon: '🦀' },
    { name: 'Рыбы-пираньи', danger: 'Средняя', description: 'Выпрыгивают из воды, опасны вблизи водоёмов', icon: '🐟' },
    { name: 'Пчёлы', danger: 'Средняя', description: 'Летают по траектории, жалят при касании', icon: '🐝' },
    { name: 'Снеговики', danger: 'Высокая', description: 'Бросают снежки с расстояния', icon: '⛄' },
    { name: 'Огненные существа', danger: 'Высокая', description: 'Огненные шары, наносят большой урон', icon: '🔥' },
    { name: 'Бомбы-ходячки', danger: 'Очень высокая', description: 'Взрываются при приближении', icon: '💣' },
    { name: 'Летучие мыши', danger: 'Средняя', description: 'Летают в пещерах, атакуют с воздуха', icon: '🦇' },
    { name: 'Призраки', danger: 'Высокая', description: 'Появляются в тёмных местах, проходят сквозь стены', icon: '👻' },
  ];

  const bosses = [
    {
      name: 'Гигантская божья коровка',
      world: 'Green Hills',
      icon: '🐞',
      difficulty: 'Легко',
      strategy: 'Прыгай на неё сверху 3 раза. Уворачивайся, когда она катится по арене'
    },
    {
      name: 'Огромный краб',
      world: 'Sandy Beach',
      icon: '🦀',
      difficulty: 'Средне',
      strategy: 'Атакуй, когда он открывает клешни. Избегай боковых атак'
    },
    {
      name: 'Ледяной голем',
      world: 'Snowy Mountains',
      icon: '🗿',
      difficulty: 'Сложно',
      strategy: 'Бей по ногам, потом атакуй голову когда падает. Не стой под сосульками'
    },
    {
      name: 'Лавовый дракон',
      world: 'Volcano Island',
      icon: '🐉',
      difficulty: 'Очень сложно',
      strategy: 'Уклоняйся от огненных шаров, атакуй хвост, потом голову'
    },
    {
      name: 'Гигантский орёл',
      world: 'Sky Kingdom',
      icon: '🦅',
      difficulty: 'Максимально',
      strategy: 'Прыгай на него когда пролетает низко, избегай атак когтями'
    },
    {
      name: 'Каменный голем',
      world: 'Cave System',
      icon: '🗿',
      difficulty: 'Сложно',
      strategy: 'Атакуй светящиеся кристаллы на теле, когда оглушён'
    },
  ];

  const secrets = [
    { 
      title: 'Backrooms Easter Egg', 
      icon: '🚪',
      description: 'Секретная жуткая локация с жёлтыми стенами',
      howTo: 'В определённых уровнях ищите стену с текстурой, отличающейся от других. Пройдите сквозь неё, чтобы попасть в бесконечный лабиринт Backrooms с монотонным гудением и флуоресцентным освещением'
    },
    { 
      title: 'Секретные комнаты с сокровищами', 
      icon: '💎',
      description: 'Скрытые помещения с большим количеством монет',
      howTo: 'Ищите трещины в стенах, необычные текстуры или подозрительные блоки. Некоторые стены можно разбить прыжком, другие - просто пройти насквозь'
    },
    { 
      title: 'Секретные костюмы', 
      icon: '👕',
      description: 'Разблокируемые скины для медвежонка',
      howTo: 'Собирайте все звёзды в мире, выполняйте специальные квесты от NPC или находите спрятанные сундуки. Костюмы: пчела, ниндзя, пират, робот, панда, полярный медведь'
    },
    { 
      title: 'Золотые монеты', 
      icon: '🪙',
      description: 'Редкие коллекционные монеты для 100% прохождения',
      howTo: 'На каждом уровне есть 1-3 золотые монеты в очень труднодоступных местах. Требуют точных прыжков, секретных путей или решения головоломок'
    },
    { 
      title: 'Секретные телепорты', 
      icon: '🌀',
      description: 'Порталы, ведущие в бонусные зоны или пропускающие часть уровня',
      howTo: 'Ищите светящиеся порталы за фальшивыми стенами или на краях карт. Некоторые требуют определённого количества звёзд для активации'
    },
    { 
      title: 'Пасхалки на другие игры', 
      icon: '🎮',
      description: 'Отсылки к Mario, Sonic, Crash Bandicoot',
      howTo: 'Зелёные трубы как в Mario, золотые кольца как в Sonic, ящики с яблоками как в Crash. Ищите их на уровнях!'
    },
    { 
      title: 'Секретный финальный уровень', 
      icon: '🏆',
      description: 'Открывается при 100% прохождении',
      howTo: 'Соберите абсолютно все звёзды, монеты и победите всех боссов на максимальной сложности'
    },
  ];

  const guides = [
    { 
      title: 'Управление и способности', 
      content: 'Джойстик/WASD - движение. Кнопка прыжка - прыжок сверху убивает врагов. Двойной прыжок открывается после первого мира. Разбивай ящики и бочки для получения монет. Звёзды нужны для открытия новых миров.'
    },
    { 
      title: 'Сбор монет и звёзд', 
      content: 'Жёлтые монеты - валюта для покупки костюмов и улучшений. Звёзды (большие золотые монеты) - главный прогресс игры, 10 звёзд открывают следующий мир. Золотые монеты - для коллекционеров 100%. Исследуйте каждый угол!'
    },
    { 
      title: 'Победа над боссами', 
      content: 'У каждого босса свой паттерн. Изучите его атаки в первые секунды боя. Большинство боссов требуют 3-5 ударов. Атакуйте только в уязвимые моменты - после промаха босса или когда он оглушён. Запасайтесь здоровьем перед боссом!'
    },
    { 
      title: 'Поиск секретов и Backrooms', 
      content: 'Проверяйте все стены - некоторые фальшивые. Backrooms находится за текстурой, которая выглядит чуть иначе (обычно в пещерах или зданиях). Слушайте звуки - секретные комнаты иногда выдают себя эхом или музыкой. Используйте двойной прыжок для труднодоступных мест.'
    },
    {
      title: 'Прохождение миров',
      content: 'Начните с Green Hills для изучения механик. Sandy Beach вводит водные уровни. Snowy Mountains добавляет скользкие поверхности. Volcano Island - самый сложный мир, требует точности. Sky Kingdom - финальное испытание. Cave System можно пройти в любой момент после открытия.'
    },
  ];

  const faq = [
    { q: 'Кто разработчик игры?', a: 'Игру Super Bear Adventure разработала инди-студия Earthkwak Games.' },
    { q: 'Кто создал этот сайт?', a: 'Этот вики-сайт создало сообщество Super Bear Adventure RU Community - русскоязычные фанаты игры!' },
    { q: 'На каких платформах доступна игра?', a: 'Игра доступна на Android (Google Play), iOS (App Store) и Nintendo Switch (eShop).' },
    { q: 'Сколько миров в игре?', a: 'В игре 6 основных миров: Green Hills, Sandy Beach, Snowy Mountains, Volcano Island, Sky Kingdom и Cave System, плюс секретные локации включая Backrooms.' },
    { q: 'Как найти Backrooms?', a: 'Ищите стены с необычной текстурой (обычно желтоватого оттенка) в пещерах, зданиях или подвалах. Пройдите сквозь неё - попадёте в жуткий лабиринт с монотонным гулом.' },
    { q: 'Можно ли играть без интернета?', a: 'Да! Super Bear Adventure полностью работает оффлайн.' },
    { q: 'Сколько всего звёзд в игре?', a: 'В игре более 120 звёзд, разбросанных по всем мирам и секретным уровням.' },
    { q: 'Как получить все костюмы?', a: 'Собирайте звёзды, выполняйте квесты NPC и ищите секретные сундуки. Некоторые костюмы требуют 100% прохождения определённых миров.' },
    { q: 'Есть ли мультиплеер?', a: 'Нет, это однопользовательская игра.' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return 'bg-green-500';
      case 'Средне': return 'bg-yellow-500';
      case 'Сложно': return 'bg-orange-500';
      case 'Очень сложно': return 'bg-red-500';
      case 'Максимально': return 'bg-purple-600';
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
                  Управляйте отважным медвежонком в красном шарфе, исследуйте огромные открытые миры, 
                  собирайте монеты и звёзды, побеждайте боссов и раскрывайте секреты!
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
                          <span>6 огромных открытых миров</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Более 120 звёзд для сбора</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Эпичные битвы с боссами</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Сотни монет и секретов</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Секретная локация Backrooms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Разблокируемые костюмы</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-1" />
                          <span>Красочная графика и музыка</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5 border-secondary/30">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Trophy" size={24} className="text-secondary" />
                        Геймплей
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">
                        Прыгайте, исследуйте, побеждайте врагов прыжком сверху и собирайте звёзды для открытия новых миров!
                      </p>
                      <p className="mb-3">
                        Каждый мир - это огромная открытая локация с множеством платформ, головоломок, секретов и боссом в конце.
                      </p>
                      <p>
                        Игра вдохновлена классикой жанра и идеально подходит для всех возрастов!
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={20} className="text-yellow-500" />
                        <span className="text-sm font-semibold">{world.levels} уровней</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={20} className="text-yellow-600" />
                        <span className="text-sm font-semibold">{world.coins}+</span>
                      </div>
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
                          <strong>Стратегия:</strong> {boss.strategy}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                        Опасность: {enemy.danger}
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
