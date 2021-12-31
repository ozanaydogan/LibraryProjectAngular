import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(books: Book[], filterText:string): Book[]  {
    filterText = filterText.toLowerCase();

    return filterText? books.filter((m: Book) =>                      // search kismina yazdigimiz kelimelerin description 
    m.title.toLowerCase().indexOf(filterText) !== -1 ||
    m.description.toLowerCase().indexOf(filterText)!== -1): books;    // veya book ismiyle esleme durumuna gore filtreleme islemleri
  }

}
