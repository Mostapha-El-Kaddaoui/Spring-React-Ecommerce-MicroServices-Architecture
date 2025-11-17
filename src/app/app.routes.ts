import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompanyListComponent } from './components/company/company-list.component';
import { CompanyDetailComponent } from './components/company/company-detail.component';
import { StockListComponent } from './components/stock/stock-list.component';
import { StockDetailComponent } from './components/stock/stock-detail.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { DashboardComponent } from './components/home/dashboard.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'companies', component: CompanyListComponent },
	{ path: 'companies/:id', component: CompanyDetailComponent },
	{ path: 'stocks', component: StockListComponent },
	{ path: 'stocks/:id', component: StockDetailComponent },
	{ path: 'chatbot', component: ChatbotComponent },
	{ path: '**', redirectTo: '' }
];
