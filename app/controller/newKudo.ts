
export const newKudo = async (sender: string, receiver: string[], message: string[], gif: any, accessToken: string) => {

    if (receiver.length === 0) {
      console.log("No Receiver")
    }
    else {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/newKudo`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken,
          },
          body: JSON.stringify({
            sender: sender,
            receiver: receiver,
            message: message,
            gif: gif,
          })
        });
        const json = await res.json()
        if(json) {
          console.log(json.message)
        }
  
      } catch (error) {
        console.error(error)
      }
    }
  }