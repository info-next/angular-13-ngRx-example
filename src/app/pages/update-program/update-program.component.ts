import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserUpdateAction } from 'src/app/core/app-state/actions/user-action';
import { RootReducerState } from 'src/app/core/app-state/reducers';
import { DataService } from 'src/app/core/services/dataservice.service ';
import { Program } from 'src/app/shared/models';

@Component({
  selector: 'app-update-program',
  templateUrl: './update-program.component.html',
  styleUrls: ['./update-program.component.css']
})
export class UpdateProgramComponent implements OnInit {
  term:string=''
  program: any=Program;
  // program={
  //   id:'',
  //   name:''
  // }
  // program={
  //   id:'',
  //   name:''
  // }
  form :any
 

  constructor(private dataservice : DataService,private store: Store<RootReducerState>) {
     this.program = dataservice.getOption()
     console.log('programs',this.program)
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.program.name ? this.program.name: null),
    })
   
  
  }

  update(){
    console.log('this.formData.data',this.form.value);
    this.store.dispatch(new UserUpdateAction(this.program));
  }

}
