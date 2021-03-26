import {Task} from './task';
import taskCategories from './taskCategories';
import timeWindows from './timeWindows';

describe('task',() => {

  describe('#Task',() => {

    it('will create a valid task given valid arguments missing taskWindow',()=>{

      const taskTitle = 'Order Pizza';
      const taskCreated = new Date().toISOString();
      const taskCategory = taskCategories.PURCHASING;
      const taskWindow = timeWindow.WORKNIGHT;
      const priority = 1;
      const result = Task({
        taskTitle,
        taskCreated,
        priority,
        taskCategory
      });
      expect(result.error).toBeUndefined();
      console.log(result);      
      console.log('end');
    });
  
  });

});