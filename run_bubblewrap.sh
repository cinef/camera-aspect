#!/bin/bash
cd /workspace/android-app-dir

# Запускаем bubblewrap init в фоне
bubblewrap init --manifest /workspace/manifest.json --directory . 2>&1 &
BW_PID=$!

# Даем время на запуск
sleep 5

# Отправляем ответы по очереди
{
    sleep 2
    echo "n"  # No для установки Android SDK (уже установлен)
    sleep 2
    echo "camera-app"  # Имя приложения
    sleep 2
    echo "com.camera.aspect"  # Package ID
    sleep 2
    echo "/workspace/android-app/icons/icon-192.png"  # Icon
    sleep 2
    echo "/workspace/android-app/icons/icon-maskable-192.png"  # Maskable icon
    sleep 2
    echo "#4CAF50"  # Splash color
    sleep 2
    echo "#111111"  # Background color
    sleep 2
    echo "https://your-github-username.github.io/camera-aspect/"  # URL
    sleep 2
    echo "y"  # Согласие с лицензией
} | tee /proc/$BW_PID/fd/0 2>/dev/null || true

wait $BW_PID 2>/dev/null || true
