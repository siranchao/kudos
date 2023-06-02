
export const newKudo = async (sender: string, receiver: string[], newMessage: string[], gifId: string) => {

    if (receiver.length === 0) {
      console.log("No Receiver")
    }
    else {
      const data = {
        sender: sender,
        receiver: receiver,
        kudoGif: gifId,
        message: newMessage,
      }
  
      try {
        const res = await fetch(`http://localhost:8080/api/kudo/newKudo`, {
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