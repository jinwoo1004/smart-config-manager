# SmartConfigManager

MySQL 설정 파라미터(tbl_config_setting_parameter)를 UI로 관리하는 로컬 Base Electron + React 데스크톱 앱.

## 시작하기
```bash
git clone https://github.com/yourname/smart-config-manager.git
cd smart-config-manager
npm install
cd renderer && npm install && cd ..
npm run build
npm run start
```

## 주요 기능
- DB 연결 테스트  
- 설정 분류별 Upsert(INSERT/UPDATE)  
- 입력값 검증 및 알림  
