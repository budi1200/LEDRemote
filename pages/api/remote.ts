import {NextApiRequest, NextApiResponse} from 'next'
import {getMqttConnection} from "../../util/mqttConnection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") return res.status(404).json("Method not supported")

  const action = req.body.command

  if (action == null) return res.status(400).json("Command Missing")

  const mqttClient = await getMqttConnection()

  try {
    await mqttClient.publish("potatoes", action)
  } catch (err) {
    return res.status(500).json("Internal Server Error")
  }

  res.status(200).json("Success")
}

export default handler
