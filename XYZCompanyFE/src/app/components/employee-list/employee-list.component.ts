import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    private service:EmployeeService,
    private router: Router
  ) { }

  employees$ : any;
  // employees$ : any;
  errorMessage$: Observable<LocalizedErrorInfo | null>;
  currentEmployeeId: number;
  // progress$: Observable<boolean> = true;
  progress$: true;
  employee : any;
  ModalTitle:string;
  ActivateAddEditEmpComp:boolean=false;

  private employeeCount = null;

  

  ngOnInit(): void {

}

addClick(){
  console.log("hi im here");
  this.employee={
    id:0,
    firstName:"",
    lastName:"",
    email:"",
    department:"",
    age:0,
    address:"",
    avatarFileName:"anonymous.png"
  }
  // this.ModalTitle="Add Employee";
  // this.ActivateAddEditEmpComp=true;
  this.router.navigateByUrl('/add');
}

editClick(item){
  console.log(item);
  this.employee=item;
  this.ModalTitle="Edit Employee";
  this.ActivateAddEditEmpComp=true;
}

deleteClick(item){
  if(confirm('Are you sure??')){
    this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
      alert(data.toString());
      this.refreshEmpList();
    })
  }
}

closeClick(){
  this.ActivateAddEditEmpComp=false;
  this.refreshEmpList();
}


refreshEmpList(){
  this.service.getEmployeeList().subscribe(data=>{
    this.employees$ = data;
  });
}


}