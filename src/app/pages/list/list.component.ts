import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { UserListRequestAction, UserListSuccessAction } from 'src/app/core/app-state/actions/user-action';
import { getUserLoaded, getUserloading, RootReducerState } from 'src/app/core/app-state/reducers';
import { getUsers } from 'src/app/core/app-state/reducers';
import { ApiserviceService } from 'src/app/core/services/apiservice.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 
  programs: any=[];

  constructor(private apiservice : ApiserviceService, private store: Store<RootReducerState>) { }



  getPublishedProgram() {
    const loading$ =this.store.select(getUserloading);
    const loaded$ =this.store.select(getUserLoaded);
    const getUserData =this.store.select(getUsers);
    combineLatest([loaded$,loading$]).subscribe((data)=>{
      if(!data[0]&& !data[1]){
        this.store.dispatch(new UserListRequestAction());
        this.apiservice.getPublishedProgram('1', '600', 'published').subscribe((res:any) => {   
            this.store.dispatch(new UserListSuccessAction({data:res.items}))
          });
      }
    })
     
      getUserData.subscribe((data)=>{
        this.programs = data
        console.log(this.programs)
      })
  }

  ngOnInit(): void {
    this.getPublishedProgram()
  }

}
