import { Paper, Step, StepButton, Stepper, Typography } from '@mui/material'
import { STAGES } from '../../../context/OpportunitiesContext.jsx'

export default function StageStepper({ stage, onChange }) {
  const activeStep = STAGES.indexOf(stage)

  return (
    <Paper elevation={0} className="border border-gray-200 p-4">
      <Typography variant="subtitle1" className="mb-3 font-medium">
        Etapa da oportunidade
      </Typography>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {STAGES.map((label, index) => (
          <Step key={label} completed={index < activeStep}>
            <StepButton onClick={() => onChange(label)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </Paper>
  )
}
