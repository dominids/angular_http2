import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, retry, tap } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private apiUrl = 'http://localhost:5000/api/users';
  readonly moreParams = ['test', 'test2'];
  readonly deafultImage= 'https://robohash.org';

  constructor(private http: HttpClient) { }

  getUsers3(): Observable<User[]> { //paczy na Usera czy się zmienia, zwraca <get> tablice z użytkownikami
    let myHeaders = new HttpHeaders({ 'myheader': ['headervalue', 'value2'] }); //headery daje , arrar nieobowiązkowy
    myHeaders = myHeaders.set('id', '1234'); //set daje nową rzecz, a nie update 
    myHeaders = myHeaders.append('id', '0000'); //dopisuje

    let myParams = new HttpParams().set('page', '5').set('sort', 'true');//dopisuje rzeczy do linku na koniec (patrz heders)
    const theParams = { ['testList']: this.moreParams };
    let myParams2 = new HttpParams({ fromObject: theParams }); // wywołanie params z obiektu
    myParams = myParams.append('name', 'junior'); //patrz na heders
    return this.http.get<User[]>(`${this.apiUrl}`, { headers: myHeaders, params: myParams2 });
  }

  getUsers2(): Observable<HttpEvent<User[]>> {
    return this.http.get<User[]>(`${this.apiUrl}`, { observe: 'events', reportProgress: true });
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}`)
  //     .pipe(
  //       retry(3) // proóbuje 3 razy połączyć się ponownie 
  //     );
  // }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`)
    .pipe(
      tap(users => console.log(users)),
      map(users => users.map(user => ({
        email: user.email,
        phone: user.phone,
        image: `${this.deafultImage}/${user.username.toLowerCase()}`,
        username: user.username,
        name: user.name.toUpperCase(),
        isAdmin: user._id === "10"? 'admin': 'user',
        searchKey: [user.name, user.username]
      }))) //transformation
    );
  }

  getTextFile(): Observable<string>{ // do plików tekstowyc np. 
    return this.http.get(`assets/file.txt`, {responseType: 'text'}); 
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/1`).pipe(
      map(user => {
        return { ...user, isAdmin: true, searchKey: [user.name, user.username] }
      })
    );
  }

  createUser(user: User): Observable<User> {
    console.log(user);
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json');
    return this.http.post<User>(`${this.apiUrl}`, user)
  }

  updateUser(user: User): Observable<User> {
    //put musisz dać wszystkie wartości bo reszta będzie domyślna
    // różni się w zależności od api
    return this.http.put<User>(`${this.apiUrl}/${user._id}`, user)
  }

  patchUser(user: User): Observable<User> {
    //patch nie  musisz dać wszystkie wartości
    return this.http.patch<User>(`${this.apiUrl}/${user._id}`, user)
  }

  deleteUser(id: string): Observable<void> {
    //delete daje ci najczęściej boolean^
    //void bo nic nie dostajemy w odpowiedzi od servera 
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
