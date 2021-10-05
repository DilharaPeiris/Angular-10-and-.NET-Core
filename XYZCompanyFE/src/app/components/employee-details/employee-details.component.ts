import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private service:EmployeeService) { }

  @Input() employee:any;
  id:number;
  firstName:string;
  lastName:string;
  age: number;
  address:string;
  department:string;
  avatarFileName: string;
  email: string;
  avatarFilePath: string;
  searchEnable:boolean = false;
  employees:any;

  ngOnInit(): void {
    console.log("hiî");
  }

  ngDoCheck(){
    if(this.firstName.length > 0 || this.email.length > 0){
      this.searchEnable = true;
    }
  }

  searchEmployee(firstName){
    console.log("hi",firstName);
    let ccc = this.service.getEmployeeList().subscribe(data=>{
      data.forEach(element => {
        if(element.firstName == this.firstName || element.email == this.email){
          this.lastName = element.lastName,
          this.department = element.department,
          this.age = element.age,
          this.address = element.address
        }
      });
      this.employees = data;
    });
  }

  addEmployee(){
    var val = { Id: this.id,
      firstName:this.firstName,
      lastName:this.lastName,
      age:this.age,
      address:this.address,
      department:this.department,
      avatarFileName:this.avatarFileName,
      email:this.email};

    this.service.addNewEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val = { Id: this.id,
      firstName:this.firstName,
      lastName:this.lastName,
      age:this.age,
      address:this.address,
      department:this.department,
      avatarFileName:this.avatarFileName,
      email:this.email};

    this.service.updateEmployee(val).subscribe(res=>{
    alert(res.toString());
    });
  }

  uploadPhoto(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.avatarFileName=data.toString();
      this.avatarFilePath=environment.photoUrl+this.avatarFileName;
    })
  }

}
