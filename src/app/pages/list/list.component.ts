import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { UserDeleteAction, UserListRequestAction, UserListSuccessAction } from 'src/app/core/app-state/actions/user-action';
import { getUserLoaded, getUserloading, RootReducerState } from 'src/app/core/app-state/reducers';
import { getUsers } from 'src/app/core/app-state/reducers';
import { ApiserviceService } from 'src/app/core/services/apiservice.service';
import { DataService } from 'src/app/core/services/dataservice.service ';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 
  programs: any=[];

  constructor(private apiservice : ApiserviceService,
              private router: Router, private store: Store<RootReducerState>,
              private dataservice : DataService) { }
             


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

  delete(id:any){
    console.log('id',id)
     this.store.dispatch(new UserDeleteAction({id}));
  }

  update(data:any){
    console.log('data to be update',data);
    this.router.navigate(['/update']);
    this.dataservice.setOption(data); 
  }

  ngOnInit(): void {
    this.getBlogs()
  }

}
