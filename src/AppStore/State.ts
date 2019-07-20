import * as ko from 'knockout';

export class Card{
    name: KnockoutObservable<string> =  ko.observable("");
}

export class Activity extends Card{
    valami: KnockoutObservable<number> = ko.observable(-1);
}

export class Storymap{
    activities: KnockoutObservableArray<Activity>;

    constructor(){
        this.activities = ko.observableArray<Activity>([])
    }
}

import { IAction, IReducer } from '../AppStore/Store'

export class State{
    storymap: Storymap;
    name: KnockoutObservable<string> = ko.observable<string>("");

    constructor(){
        this.storymap = new Storymap();
        const a = new Activity();
        a.name("jani");
        a.valami(100);

        this.storymap.activities.push(a);
    }
}

export interface IBaseReducer<A extends IAction> extends IReducer<State, A>{    
}

export class AddActivityAction implements IAction {
    actionType: string =  AddActivityAction.name;

    id: number;
    name: string;
}

export class OtherAction implements IAction {
    actionType: string = OtherAction.name;
}

export class AddActivityReducer implements IBaseReducer<AddActivityAction>{
    public actionType: string = AddActivityAction.name;

    public handle(state: State, action: AddActivityAction){
         console.log("béla");
         console.log("action.name: " + action.name);

         state.name(action.name);
     }
}

export class OtherActionReducer implements IBaseReducer<OtherAction>{
    public actionType: string = OtherAction.name;

    public handle(state: State, action: OtherAction){
         console.log("károly");
     }
}
