import * as bizbass from './a'
import { appStore }  from './AppStore/Store';
import * as model  from './AppStore/State';


var state = new model.State();
var store = new appStore(state);

var subId = store.getState().subscribe((newState)=>{
    console.log("State changed");
    console.log("    activites count:" + newState.storymap.activities().length);
    console.log("    storymap name: " + newState.name());
});

const a = new model.Activity();
a.name("jani");
a.valami(100);
store.getState()().storymap.activities.push(a);
store.getState()().name("anyád");
//store.state.valueHasMutated();

console.log("naaaa???");

store.registerReducer(new model.AddActivityReducer());
store.registerReducer(new model.OtherActionReducer());

var action = new model.AddActivityAction();
action.id = 1;
action.name = "bazzeg";

store.dispatchAction(action);
