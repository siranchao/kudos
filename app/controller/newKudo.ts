
export const newKudo = async (receiver: string[], gifId: string, newMessage: string[], sender: string) => {

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
        const res = await fetch(`api/kudos`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
  
        const json = await res.json()
        console.log(json);
  
      } catch (error) {
        console.error(error)
      }
    }
  }