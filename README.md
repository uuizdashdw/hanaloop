# 🌍 Carbon Emissions Dashboard

탄소 배출량(온실가스) 대시보드 과제 프로젝트입니다.  
회사별 월별 배출 데이터를 시각화하고, 관련 보고(Post)를 관리할 수 있는 웹 애플리케이션입니다.  
Next.js(App Router) + React 18 + TypeScript + Tailwind CSS 기반으로 작성되었습니다.  

---

## 🚀 실행 방법

### 1. 설치
```bash
cd carbon-dashboard
npm install
```

<br><br>

### 2. 개발 서버 실행
```bash
npm run dev
```

<br><br>

### 3. 기술 스택

- **Framework**: Next.js 14 (App Router)  
- **Language**: TypeScript, React 18  
- **Styling**: Tailwind CSS  
- **State Management**: Zustand  
- **Data Layer**: Fake Backend Stub (`lib/api.ts`)  
- **Chart**: Recharts (가벼운 시각화 라이브러리)  

<br></br>

### 4. 프로젝트 구조

```bash
src/
├── app/
│   ├── layout.tsx        # 전체 레이아웃
│   ├── page.tsx          # 대시보드 메인 페이지
│   ├── companies/        # 회사별 상세 및 차트 페이지
│   └── posts/            # 보고서(Post) 관련 페이지
│   └── countries/        # 국가별 상세 및 차트 페이지
├── components/           # UI 컴포넌트
│   ├── company/          # app/companies 에 필요한 컴포넌트
│   ├── country/          # app/countries 에 필요한 컴포넌트
│   ├── posts/            # app/posts 에 필요한 컴포넌트
│   └── common/           # Card, Button 등 공용 컴포넌트
├── lib/
│   ├── api.ts            # Fake backend (네트워크 지연/실패 확률 포함)
│   └── data.ts           # 목업 데이터
├── store/                # Zustand 상태 관리
│   ├── period.ts         # 데이터 필터용(월별 필터링) store
│   ├── post.ts           # 보고서 관련 store
│   └── search.ts         # 데이터 검색 키워드 관련 store
├── types/                # 타입 관리
│   ├── common/           # 공용 타입 관리
│   │     └── index.ts    # 공용 타입
│   └── index.ts          # 베럴 패턴용
├── utils/                # 프로젝트 유틸 함수 관리
│   ├── index.ts          # 메타 데이터 관련 유틸 함수 제외 관리
│   └── meta.ts           # 메타 데이터 유틸 함수 관리
├── hooks/                # 커스텀 훅 관리
│   └── useFilteredEmissions.ts  # 배출량 데이터를 기간/필터 조건에 맞게 가공하는 커스텀 훅
├── providers/            # 커스텀 훅 관리
└── └── ReactQueryProvider.ts  # 리액트 쿼리 프로바이더





   
```

<br></br>

### 5. 구현 내용 및 설계 의도

#### 📌 대시보드 레이아웃
- 좌측 네비게이션 + 상단 헤더 + 메인 콘텐츠 구조로 설계  
- 직관적으로 회사/국가별 배출량 현황을 확인 가능  

#### 📊 데이터 시각화
- 회사별, 월별 **(1, 3, 6, 12개월 별)** 배출량을 라인 차트로 표시  
- 월 단위 **(1, 3, 6, 12개월 별)**, 회사별, 국가별 필터링 가능  
- 툴팁을 통해 세부 수치 확인  

#### 📝 보고(Post) 관리
- 특정 회사 + 특정 월에 연결된 보고서(Post) CRUD 가능  
- 저장 요청 시 15% 확률로 실패 처리 → 에러 알림 표시 및 롤백  

#### 🎨 UI/UX
- Tailwind 기반 브랜드 컬러 팔레트 적용    
- 일관된 Card, Button, Input 컴포넌트 활용
- **반응형 레이아웃**: 대시보드 특성상, **모바일 환경**에는 맞추지 않았습니다. 

#### ⚙️ 엔지니어링 고려
- 상태 관리 분리: 데이터 상태, 필터 상태, UI 상태 분리  
- 네트워크 상태 처리: 로딩/에러 표시  
- 재사용성 확보: 컴포넌트 단위로 모듈화  


<br></br>


### 6. 가정 및 의사결정
- 국가(country) 데이터는 code / name만 가진다고 단순화
- 배출량(emissions)은 ton 단위 CO₂eq로 고정
- API 실패 시 사용자에게 알림을 주고 기존 상태 유지
- 라이브러리는 최소화 → 큰 UI 프레임워크 대신 Tailwind + 소규모 유틸리티만 사용

<br></br>

### 7. 작업 시간 기록
- 프로젝트 세팅 : 30분
