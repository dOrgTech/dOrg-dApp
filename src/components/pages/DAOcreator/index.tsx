import * as React from "react";
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
  Stepper,
  Step,
  StepLabel,
  Card,
  Button
} from "@material-ui/core";
import NamingStep from "./NamingStep";
import MembersStep from "./MembersStep";
// import SchemesStep from "./SchemesStep"
import { DAOForm, CreateDAOForm } from "../../../lib/forms";
import { FormState } from "formstate";

// eslint-disable-next-line
interface Props extends WithStyles<typeof styles> {}

interface State {
  step: number;
}

interface Step {
  title: string;
  form: FormState<any>;
  Component: any;
}

class DAOcreator extends React.Component<Props, State> {
  form: DAOForm = CreateDAOForm();

  constructor(props: Props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  render() {
    const steps: Step[] = [
      {
        title: "Name",
        form: this.form.$.config,
        Component: NamingStep
      },
      {
        title: "Members",
        form: this.form.$.members,
        Component: MembersStep
      } /*,
      {
        title: "Features (schemes)",
        form: this.form.$.schemes,
        Component: SchemesStep,
      }*/
    ];
    const { classes } = this.props;
    const { step } = this.state;
    const isLastStep = step === steps.length - 1;
    const { form, Component } = steps[step];

    const previousStep = async () => {
      this.setState({
        step: this.state.step - 1
      });
    };

    const nextStep = async () => {
      const res = await form.validate();

      if (!res.hasError) {
        this.setState({
          step: this.state.step + 1
        });
      }
    };

    return (
      <div className={classes.root}>
        <Card>
          <Stepper className={classes.stepper} activeStep={step}>
            {steps.map(thisStep => (
              <Step key={thisStep.title}>
                <StepLabel>{thisStep.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Card>
        <div className={classes.content}>
          <Component form={form} />
        </div>
        {isLastStep ? (
          <></>
        ) : (
          <div>
            <Button
              variant={"contained"}
              color={"primary"}
              disabled={step === 0}
              onClick={previousStep}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={nextStep}
              className={classes.button}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    );
  }
}

// STYLE
const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 30,
      paddingTop: 50,
      justifySelf: "center",
      // bring forward (infront of background)
      position: "relative",
      pointerEvents: "none",
      maxWidth: 1000,
      margin: "auto"
    },
    stepper: {
      pointerEvents: "all"
    },
    content: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      pointerEvents: "all"
    },
    button: {
      marginRight: theme.spacing.unit,
      backgroundColor: "rgba(167, 167, 167, 0.77)!important", //TODO: find out why desabled buttons disapper, then fix it and remove this
      pointerEvents: "all"
    }
  });

export default withStyles(styles)(DAOcreator);
