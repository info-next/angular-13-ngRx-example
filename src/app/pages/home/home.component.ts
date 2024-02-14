import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { UserListRequestAction, UserListSuccessAction } from 'src/app/core/app-state/actions/user-action';
import { getUserLoaded, getUserloading, getUsers, RootReducerState } from 'src/app/core/app-state/reducers';
import { ApiserviceService } from 'src/app/core/services/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  programs: any=[];

  constructor(private apiservice : ApiserviceService, private store: Store<RootReducerState>) { }

  ngOnInit(): void {
    this.getBlogs()
  }

  getBlogs() {
    const loading$ =this.store.select(getUserloading);
    const loaded$ =this.store.select(getUserLoaded);
    const getUserData =this.store.select(getUsers);
    combineLatest([loaded$,loading$]).subscribe((data)=>{
      if(!data[0]&& !data[1]){
        this.store.dispatch(new UserListRequestAction());
        this.apiservice.getBlogs().subscribe((res:any) => {   
            this.store.dispatch(new UserListSuccessAction({data:res}))
          });
      }
    })
      getUserData.subscribe((data)=>{
        this.programs = data
        console.log('programs',this.programs)
      })
  }

}
