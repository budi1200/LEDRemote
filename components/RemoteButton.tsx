import {Property} from "csstype";
import BackgroundColor = Property.BackgroundColor;

interface IRemoteButton {
  name: String,
  color: String,
  icon: String,
  text: String,
  click: Function
}

export const RemoteButton = (props: IRemoteButton) => {
  return (
    <div style={{
      backgroundColor: props.color as BackgroundColor,
      fontSize: props.text?.length == 1 ? "22px" : "84%"
    }}
         className={"m-2 rounded-3xl w-16 h-16 flex justify-center items-center cursor-pointer shadow-sm shadow-white/50"}
         onClick={() => props.click(props.name)}
    >
      {props.icon ? <img src={`/symbols/${props.icon}`} alt={""}/> : null}
      {props.text ?? null}
    </div>
  )
}

RemoteButton.defaultProps = {
  color: "white",
  icon: null,
  text: null
}