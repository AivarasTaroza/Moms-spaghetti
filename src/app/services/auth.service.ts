
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

//models
import { Admin } from '../interfaces/admin.interface';
import { Employee } from '../interfaces/employee.interface';
import { Customer } from '../interfaces/customer.interface';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}


    token: string;
    refresh_token: string;

    refreshSessionSubject = new Subject<any>();

    admin: Admin;
    employee: Employee;
    customer: Customer;

    loginSubject    = new Subject<any>();
    logoutSubject   = new Subject<any>();

    registerSubject = new Subject<any>();
    registerEmployeeSubject = new Subject<any>();

    getEmployeesSubject = new Subject<any>();
    getEmployeeSubject = new Subject<any>();

    getProfitsSubject = new Subject<any>();

    login(email: string, password: string) {
        this.http.post(environment.key + 'session', {
            email: email,
            password: password
        }).subscribe({
            next: (res) => { this.loginSubject.next(res);   },
            error:  (e) => { this.loginSubject.next(e);     }
        });
    }

    logout() {
        this.http.delete(environment.key + 'session').subscribe({
            next: (res) => { this.logoutSubject.next(res); },
            error:  (e) => { this.logoutSubject.next(e); }
        });
    }

    refresh() {

    }

    register(email: string, password: string, name: string, surname: string, address: string, phone: string, gender: string, dateOfBirth: string, allergens: string) {
        this.http.post(environment.key+'customers', {
            email: email,
            password: password,
            name: name,
            surname: surname,
            address: address,
            phoneNumber: phone,
            gender: gender,
            dateOfBirth: dateOfBirth,
            allergens: allergens 
        }).subscribe({
            next: (res) => { this.registerSubject.next(res); },
            error:  (e) => { this.registerSubject.next(e); }
        });
    }

    register_employee(email: string, password: string, name: string, surname: string, address: string, phone: string, dateOfBirth: string, salary: number, workload: number, bankAccount: string) {
        this.http.post(environment.key+'employees', {
            email: email,
            password: password,
            name: name,
            surname: surname,
            address: address,
            phoneNumber: phone,
            dateOfBirth: dateOfBirth,
            salary: salary,
            workload: workload,
            bankAccount: bankAccount,
        }).subscribe({
            next: (res) => { this.registerEmployeeSubject.next(res); },
            error:  (e) => { this.registerEmployeeSubject.next(e);   }
        });
    }


    refreshSession(token: string) {

        this.http.post(environment.key + "session/refresh", {

            refresh_token: token

        }).subscribe( {

            next: (res) => { this.refreshSessionSubject.next(res)},
            error:  (e) => { this.refreshSessionSubject.next(e); }

        });

    }

    getEmployees() {
        this.http.get(environment.key + 'employees').subscribe({
            next: (res) => { this.getEmployeesSubject.next(res); },
            error:  (e) => { this.getEmployeesSubject.next(e); }
        });
    }
    getEmployee(id: string) {
        this.http.get(environment.key + 'employees/' + id).subscribe({
            next: (res) => { this.getEmployeeSubject.next(res); },
            error:  (e) => { this.getEmployeeSubject.next(e); }
        });
    }

    profits() {
        this.http.get(environment.key + 'profits').subscribe({
            next: (res) => { this.getProfitsSubject.next(res); },
            error:  (e) => { this.getProfitsSubject.next(e); },
        });
    }

}