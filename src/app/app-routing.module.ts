import { NgModule } from '@angular/core';
import { RouterModule, Routes,PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'actions',
    loadChildren:()=>import('./pages/actions/actions.module').then(m=> m.ActionsModule)
  },

  {path: 'dostavka-ta-oplata',
    loadChildren:()=>import('./pages/dostavka-ta-oplata/dostavka-ta-oplata.module').then(m=> m.DostavkaTaOplataModule)
  },

  {path: 'about-us',
    loadChildren:()=>import('./pages/about-us/about-us.module').then(m=> m.AboutUsModule)
  },

  {path: 'product-category/:category',
    loadChildren:()=>import('./pages/product-category/product-category.module').then(m=> m.ProductCategoryModule)
  },

  {path:'auth',
    loadChildren:()=>import('./pages/authorization/authorization.module').then(m=> m.AuthorizationModule)
  },
  {path:'cabinet',canActivate:[AuthGuard],
    loadChildren:()=>import('./pages/cabinet/cabinet.module').then(m=> m.CabinetModule)
  },
  {path:'offerta',
    loadChildren:()=>import('./pages/offerta/offerta.module').then(m=> m.OffertaModule)
  },

  {path:'admin',canActivate:[AuthGuard],
  loadChildren:()=>import('./admin/admin.module').then(m=> m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
