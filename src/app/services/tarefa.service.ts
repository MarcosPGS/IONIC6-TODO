import { Injectable } from '@angular/core';
import { ITarefa } from '../pages/home/tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  tarefaCollection: ITarefa[] = [];
  key = 'tarefaCollection';
  collection: ITarefa[] = [];
  constructor() {}

  salvar(nome: string, callback: any){
    const tarefa: ITarefa = {nome: nome, feito: false};
    //Obter do localstorage
    const value = localStorage.getItem(this.key);
    if (value === null || value === undefined) {
      this.tarefaCollection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));
    } else {
      this.collection = JSON.parse(value);
      this.collection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.collection));
    }
    if (callback !== null) {
      callback();
    }
  }

  listar() {
    //Obter do localstorage
    const value = localStorage.getItem(this.key);
    if (value === null || value === undefined) {
      return [];
    } 
    const tarefas: any[] = JSON.parse(value);
    return tarefas; 
  }

  deletar(item: ITarefa, callback: any) {
    //Obter do localstorage
    const value = localStorage.getItem(this.key);
    if (value === null || value === undefined) {
      return;
    } 
    this.collection = JSON.parse(value);
    const tarefas = this.collection.filter(tarefa => {return tarefa.nome !== item.nome})
    localStorage.setItem(this.key, JSON.stringify(tarefas));
    if (callback !== null) {
      callback();
    }
  }

  atualizar(item: ITarefa, callback: any) {
    //Obter do localstorage
    const value = localStorage.getItem(this.key);
    if (value === null || value === undefined) {
      return;
    } else {
      this.collection = JSON.parse(value);
      this.collection.forEach(tarefa => {
        if (tarefa.nome === item.nome) {
          tarefa.feito = item.feito;
        }
      });

      localStorage.setItem(this.key, JSON.stringify(this.collection));
    }
    if (callback !== null) {
      callback();
    }
  }
}
