# Smart Gas Cooker

Smart Gas Cooker is a mobile monitoring application for an IoT-based gas leakage detection system. The app is designed to help a user monitor LPG concentration in real time, receive leak alerts, and control the gas shut-off valve through the interface.

## What the application does

- Displays live gas concentration readings from the MQ-2 sensor
- Shows the current system state of the solenoid valve
- Raises alerts when gas concentration reaches a warning or danger level
- Records monitoring activity such as readings, alerts, and valve actions
- Provides a simple mobile interface for observing the safety system remotely

## Main screens

- Home dashboard: shows the current gas concentration and valve status
- Alerts screen: displays recent leak and warning notifications
- History screen: shows monitoring logs and actions taken by the system

## Project focus

This application is built around a gas leakage detection system and is not intended for gas level measurement, temperature monitoring, or general home automation. The main purpose is to support safe LPG leak detection and automatic shut-off response.

## Technology used

- React Native with Expo
- Zustand for app state management
- Expo Router for navigation
- Lucide icons and custom UI components for the interface
