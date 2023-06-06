
export const newKudo = async (sender: string, receiver: string[], message: string[], gif: any) => {

    if (receiver.length === 0) {
      console.log("No Receiver")
    }
    else {
      const data = {
        sender: sender,
        receiver: receiver,
        message: message,
        gif: gif,
      }
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/newKudo`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        const json = await res.json()
        if(json) {
          console.log("Success creating New Kudo")
        }
  
      } catch (error) {
        console.error(error)
      }
    }
  }