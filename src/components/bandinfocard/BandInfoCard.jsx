import Card from "@mui/joy/Card"
import './BandInfoCard.css'

export default function BandInfoCard({children}) {
  return (
    <Card id="bandInfoContainer">
        { children }
    </Card>
  )
}