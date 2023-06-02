/** @jsx vNode */
import {vNode} from "@ocdladefense/view";





const EmailDraft = function(props){
  let content = props.content;
  return (
    <div class="text-center m-2 p-4">
        <form>
          <label for="recipient">Send to: </label>
          <input type="text" id="recipient" name="recipient" />
          <br />
          <label for="subject" >Subject: </label>
          <input type="text" id="subject" name="subject" />
          <br />
          <button type="submit" data-action="send-forecast">Send Forecast</button>
        </form>
          <div id="body">
            {content}
          </div>
      </div>
  )

};




export {EmailDraft};