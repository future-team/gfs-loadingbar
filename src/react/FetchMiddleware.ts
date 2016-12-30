let win:{dispatch?:any};

win = window;

export default function fetchgMiddleware(store:any){

    window['dispatch'] = store.dispatch;

    return function(next){
        
        return function(action){
            return next(action);
        }
    }
};