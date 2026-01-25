import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WikiHeaderProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  showUpdateTimer: boolean;
}

const WikiHeader = ({ isDarkTheme, toggleTheme, showUpdateTimer }: WikiHeaderProps) => {
  return (
    <>
      {showUpdateTimer && localStorage.getItem('update_timer') && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-center gap-3">
            <Icon name="Clock" size={20} />
            <p className="font-semibold">
              ⏰ Обновление запланировано на: {new Date(localStorage.getItem('update_timer')!).toLocaleString('ru-RU')}
            </p>
          </div>
        </div>
      )}
      
      <header className="text-center mb-12 animate-fade-in">
        <div className="flex justify-end mb-4">
          <Button onClick={toggleTheme} variant="outline" size="sm" className="gap-2">
            {isDarkTheme ? (
              <>
                <span className="text-red-500 text-xl">✓</span>
                <span>Тёмная тема</span>
              </>
            ) : (
              <>
                <span className="text-blue-500 text-xl">✓</span>
                <span>Светлая тема</span>
              </>
            )}
          </Button>
        </div>
        
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
          Super Bear Adventure <span className="text-3xl text-red-500">(обновление бета тест)</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          Полная русская энциклопедия игры
        </p>
        <Badge variant="secondary" className="text-sm px-4 py-2 mb-2">
          Разработчик игры: Earthkwak Games
        </Badge>
        <p className="text-sm text-muted-foreground mt-4">
          🎮 Открытый мир • 🐝 6 уникальных локаций • 🌟 32 звезды • 🎯 5 боссов
        </p>
      </header>
    </>
  );
};

export default WikiHeader;
