import * as ko from "knockout"

export class appStore<T>{
    protected state: KnockoutObservable<T>;

    protected reducers: Map<string, Array<any>>;

    constructor(defaultState : T){
        this.state = ko.observable(defaultState);
        this.reducers = new Map();
    }

    public getState(){
        return this.state;
    }

    public registerReducer<AT extends IAction>(reducer: IReducer<T, AT> ){
        var key = reducer.actionType;
        if(this.reducers.has(key)){
            this.reducers.get(key).push(reducer);
        }
        else{
            this.reducers.set(key, [reducer]);
        }
    }

    public dispatchAction<A extends IAction>(action: A){
        var key = action.actionType;
        if(this.reducers.has(key)){
           var actionReducers =  this.reducers.get(key);

           actionReducers.forEach(reducer => {
               reducer.handle(this.state(), action);
           });
           this.state.valueHasMutated();
        }
    }
}

export interface IAction{
    actionType: string;
}

export interface IReducer<T, AT extends IAction>{
    handle: (state: T, action: AT ) => void;
    
    actionType: string; //must be equvalent to action.actionType
}