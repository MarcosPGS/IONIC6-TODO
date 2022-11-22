import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';
import { ITarefa } from './tarefa';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefaCollection: ITarefa[] = [];

  constructor(private alertController: AlertController, private tarefaService: TarefaService, private actionSheetCtrl: ActionSheetController) {}
  ionViewDidEnter(){
    this.listarTarefas();
  }
  listarTarefas(): void {
    this.tarefaCollection = this.tarefaService.listar();
  }
  async showAdd() {
    const alert = await this.alertController.create({
      header: 'Informe a tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Descreva a tarefa'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Salvar',
          role: 'confirm',
          handler: (form) => {
            console.log(form);
            // localStorage.setItem('Tarefa', form.tarefa);
            this.tarefaService.salvar(form.tarefa, () => {
              this.listarTarefas();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  deletar(tarefa: ITarefa) {
    this.tarefaService.deletar(tarefa, ()=> {this.listarTarefas();});
    
  }
  async openActions(tarefa: ITarefa){ 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O QUE QUER FAZER?',
      buttons: [
        {
          text: tarefa.feito  ? 'Desmarcar' : 'Marcar como realizado',
          icon: tarefa.feito ?  'close-outline'  : 'checkmark-circle',
          handler: () =>{
            tarefa.feito = !tarefa.feito;
            this.tarefaService.atualizar(tarefa, () => {
              this.listarTarefas();
            });
          }
        },

        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }
}