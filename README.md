# Mobile App Publishing Platform

Nền tảng nội bộ để quản lý và publish mobile app/games với đầy đủ các nghiệp vụ từ Kinh doanh, Marketing đến Sản phẩm.

## Tính năng chính

- **Quản lý App/Games**: Upload, quản lý metadata, version control
- **Kinh doanh**: Revenue tracking, monetization strategies, financial reports
- **Marketing**: Campaign management, user acquisition, analytics
- **Sản phẩm**: Product roadmap, feature tracking, user feedback
- **Analytics Dashboard**: Real-time metrics cho executives
- **Role-based Security**: Phân quyền theo vai trò

## Tech Stack

- **Frontend**: ReactJS với TypeScript
- **Backend**: Python FastAPI
- **Database**: PostgreSQL
- **Authentication**: Google OAuth 2.0
- **Deployment**: Docker

## Cấu trúc Project

```
├── backend/          # Python FastAPI backend
├── frontend/         # ReactJS frontend
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites
- Docker và Docker Compose
- Google OAuth 2.0 credentials

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd pro.anhnd.com
```

2. **Setup Google OAuth**
   - Truy cập [Google Cloud Console](https://console.cloud.google.com/)
   - Tạo project mới hoặc sử dụng project có sẵn
   - Enable Google+ API
   - Tạo OAuth 2.0 credentials
   - Thêm `http://localhost:3000` và `http://localhost:8000` vào Authorized origins

3. **Cấu hình environment**
```bash
cp env.example .env
# Chỉnh sửa .env với Google OAuth credentials
```

4. **Chạy setup script**
```bash
./setup.sh
```

5. **Access ứng dụng**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Manual Setup

Nếu không sử dụng setup script:

```bash
# Start services
docker-compose up --build

# Stop services
docker-compose down
```

## Roles & Permissions

- **Admin**: Full access
- **Executive**: Dashboard, reports, high-level metrics
- **Business Manager**: Revenue, monetization, financial data
- **Marketing Manager**: Campaigns, user acquisition, marketing analytics
- **Product Manager**: Product roadmap, features, user feedback
- **Developer**: Technical aspects, app deployment
- **Analyst**: Data access, reporting tools

