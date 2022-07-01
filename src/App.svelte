<script lang="ts">
  import {useRegisterSW} from 'virtual:pwa-register/svelte';
  import RemoteButton from "./components/RemoteButton.svelte";
  import { sendRequest } from "./utils/mqtt";
  import CustomToast from "./components/CustomToast.svelte";
  import { errorToast } from "./utils/toastUtil";

  useRegisterSW({
    onRegistered(swr) {
      console.log(`SW registered: ${swr}`);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
    onOfflineReady() {
      console.log('SW ready for offline')
    }
  });

  const sendSignal = async (button: String) => {
    // TODO: User feedback
    try {
      await sendRequest(`${button}${String.fromCharCode(3)}`)
    } catch (err) {
      errorToast("Error sending request")
      console.log(err)
    }
  }
</script>

<main>
  <div>
    <main>
      <div class={"border-4 border-black p-3 select-none w-screen max-w-sm mx-auto"}>
        <div class={"grid grid-cols-2 gap-2"}>
          <div class={"bg-black flex justify-between rounded-lg"}>
            <RemoteButton name={"BPlus"} icon={"brightness_up.svg"} click={sendSignal}/>
            <RemoteButton name={"BMinus"} icon={"brightness_down.svg"} click={sendSignal}/>
          </div>

          <div class={"bg-black flex justify-between rounded-lg"}>
            <RemoteButton name={"next"} color={"black"} icon={"skip.svg"} click={sendSignal}/>
            <RemoteButton name={"OFF"} color={"red"} icon={"power.svg"} click={sendSignal}/>
          </div>
        </div>

        <div class={"bg-black flex justify-around rounded-lg mt-2 flex-wrap"}>
<!--          Row 1-->
          <RemoteButton name={"R"} color={"red"} text={"R"} click={sendSignal}/>
          <RemoteButton name={"G"} color={"green"} text={"G"} click={sendSignal}/>
          <RemoteButton name={"B"} color={"blue"} text={"B"} click={sendSignal}/>
          <RemoteButton name={"W"} color={"white"} text={"W"} click={sendSignal}/>

<!--          Row 2-->
          <RemoteButton name={"B1"} color={"#FF7203"} click={sendSignal}/>
          <RemoteButton name={"B2"} color={"#44D419"} click={sendSignal}/>
          <RemoteButton name={"B3"} color={"#0290F0"} click={sendSignal}/>
          <RemoteButton name={"B4"} color={"#FFC6D4"} click={sendSignal}/>

<!--          Row 3-->
          <RemoteButton name={"B5"} color={"#FD7202"} click={sendSignal}/>
          <RemoteButton name={"B6"} color={"#2AEBF9"} click={sendSignal}/>
          <RemoteButton name={"B7"} color={"#292C7B"} click={sendSignal}/>
          <RemoteButton name={"B8"} color={"#FFC6D4"} click={sendSignal}/>

<!--          Row 4-->
          <RemoteButton name={"B9"} color={"#FFA604"} click={sendSignal}/>
          <RemoteButton name={"B10"} color={"#007A91"} click={sendSignal}/>
          <RemoteButton name={"B11"} color={"#581944"} click={sendSignal}/>
          <RemoteButton name={"B12"} color={"#9EE9FF"} click={sendSignal}/>

<!--          Row 5-->
          <RemoteButton name={"B13"} color={"#FFE400"} click={sendSignal}/>
          <RemoteButton name={"B14"} color={"#03597C"} click={sendSignal}/>
          <RemoteButton name={"B15"} color={"#B9276E"} click={sendSignal}/>
          <RemoteButton name={"B16"} color={"#9AE8FE"} click={sendSignal}/>
        </div>

        <div class={"bg-black flex justify-around rounded-lg mt-2 flex-wrap"}>
<!--          Row 1-->
          <RemoteButton name={"UPR"} icon={"up_red.svg"} click={sendSignal}/>
          <RemoteButton name={"UPG"} icon={"up_green.svg"} click={sendSignal}/>
          <RemoteButton name={"UPB"} icon={"up_blue.svg"} click={sendSignal}/>
          <RemoteButton name={"QUICK"} text={"QUICK"} click={sendSignal}/>

<!--          Row 2-->
          <RemoteButton name={"DOWNR"} icon={"down_red.svg"} click={sendSignal}/>
          <RemoteButton name={"DOWNG"} icon={"down_green.svg"} click={sendSignal}/>
          <RemoteButton name={"DOWNB"} icon={"down_blue.svg"} click={sendSignal}/>
          <RemoteButton name={"SLOW"} text={"SLOW"} click={sendSignal}/>

<!--          Row 3-->
          <RemoteButton name={"DIY1"} text={"DIY1"} click={sendSignal}/>
          <RemoteButton name={"DIY2"} text={"DIY2"} click={sendSignal}/>
          <RemoteButton name={"DIY3"} text={"DIY3"} click={sendSignal}/>
          <RemoteButton name={"AUTO"} text={"AUTO"} click={sendSignal}/>

<!--          Row 4-->
          <RemoteButton name={"DIY4"} text={"DIY4"} click={sendSignal}/>
          <RemoteButton name={"DIY5"} text={"DIY5"} click={sendSignal}/>
          <RemoteButton name={"DIY6"} text={"DIY6"} click={sendSignal}/>
          <RemoteButton name={"FLASH"} text={"FLASH"} click={sendSignal}/>

<!--          Row 5-->
          <RemoteButton name={"JUMP3"} text={"JUMP3"} click={sendSignal}/>
          <RemoteButton name={"JUMP7"} text={"JUMP7"} click={sendSignal}/>
          <RemoteButton name={"FADE3"} text={"FADE3"} click={sendSignal}/>
          <RemoteButton name={"FADE7"} text={"FADE7"} click={sendSignal}/>
        </div>
      </div>
    </main>
  </div>
  <CustomToast/>
</main>
