# Инструкция по созданию APK для Android

Ваше PWA-приложение готово к конвертации в Android-приложение!

## Вариант 1: Установка прямо из браузера (рекомендуется)

1. Загрузите проект на GitHub Pages или любой HTTPS-хостинг
2. Откройте ссылку в Chrome на Android
3. Нажмите "Установить приложение" или "Добавить на главный экран"
4. Приложение будет установлено как нативное

## Вариант 2: Создание APK через Bubblewrap

### Требования:
- Node.js (уже установлен)
- JDK 17 (уже установлен в /root/.bubblewrap/jdk)
- Android SDK (нужно установить вручную)

### Шаги:

1. Установите Android SDK Command Line Tools:
   - Скачайте с https://developer.android.com/studio#command-tools
   - Распакуйте в ~/.android/sdk/cmdline-tools

2. Примите лицензии:
   ```bash
   yes | sdkmanager --licenses
   ```

3. Установите необходимые компоненты:
   ```bash
   sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
   ```

4. Инициализируйте Bubblewrap:
   ```bash
   cd /workspace/android-app
   bubblewrap init --manifest /workspace/manifest.json --directory .
   ```

5. Создайте keystore для подписи:
   ```bash
   keytool -genkey -v -keystore camera-app.keystore -alias camera-app \
     -keyalg RSA -keysize 2048 -validity 10000
   ```

6. Соберите APK:
   ```bash
   bubblewrap build
   ```

## Вариант 3: Использование онлайн-сервисов

Можно использовать сервисы вроде:
- https://pwabuilder.com (от Microsoft)
- https://appgyver.co

Они автоматически создадут APK из вашего PWA.

## Иконки

Иконки уже сгенерированы в папке `/workspace/android-app/icons/`:
- icon-192.png (192x192)
- icon-512.png (512x512)
- icon-maskable-192.png (192x192, maskable)
- icon-maskable-512.png (512x512, maskable)

## Важные замечания

1. В manifest.json замените `start_url` и `scope` на ваш реальный URL после деплоя
2. Для публикации в Google Play нужен аккаунт разработчика ($25 единоразово)
3. Для установки без Google Play просто передайте APK файл на устройство
