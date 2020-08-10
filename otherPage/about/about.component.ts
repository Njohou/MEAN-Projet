import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgencyService } from 'src/app/service/agency.service';
import { AgencePrograms } from '../../models/agencePrograms.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  researchForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private agenceService : AgencyService) { }

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm(){
    this.researchForm = this.formBuilder.group({
      Path : ['', Validators.required],
      Agency : ['', Validators.required],
      jourDepart : ['', Validators.required],
      heureDepart : ['', Validators.required],
      Price : ['', Validators.required]
    });
  }

  onSubmit(){
    const path = this.researchForm.get('Path').value;
    const agence = this.researchForm.get('Agency').value;
    const datedepart = this.researchForm.get('jourDepart').value;
    const heuredepart = this.researchForm.get('heureDepart').value;
    const price = this.researchForm.get('Price').value;

    console.log(path+','+datedepart+','+heuredepart+','+price+','+agence);

    const agencePrograms = new AgencePrograms(agence, datedepart, heuredepart,path, price);

    this.agenceService.ProgramsResearch(agencePrograms);
  }

}
