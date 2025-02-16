export namespace main {
	
	export class Task {
	    ID: number;
	    Text: string;
	    Completed: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.Text = source["Text"];
	        this.Completed = source["Completed"];
	    }
	}

}

