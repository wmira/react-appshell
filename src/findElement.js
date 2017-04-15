
import { Children } from 'react';


export const findElement = Element => children => {
    return Children.toArray(children)
                .reduce( (partial, next) => {                           
                    if ( partial === null && next.type === Element) {
                        return next;
                    }                    
                    return partial;
                }, null);
    
};

export default findElement;