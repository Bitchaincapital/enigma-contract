import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class DepositDialog extends React.Component {
    constructor (props) {
        super (props);

    }

    state = {
        open: false,
        deal: {},
        deposit: {}
    };

    componentWillReceiveProps (nextProps) {
        this.setState ({ open: nextProps.open });
        this.setState ({ deal: nextProps.deal });
        this.setState ({ deposit: { amount: nextProps.deal.deposit } })
    }

    handleMakeDeposit = () => {
        this.props.makeDeposit (this.state.deal, this.state.deposit);
        this.setState ({ open: false });
    };

    handleClose = () => {
        this.setState ({ open: false });
        this.props.onClose ();
    };

    updateDepositState (event) {
        event.preventDefault ();
        let deposit = this.state.deposit;
        let name = event.target.name;
        let value = event.target.value;

        deposit[name] = value;

        this.setState ({ deposit: deposit });
    }

    render () {
        return (
            <Dialog
                open={this.state.open}
                onClose={evt => this.handleClose ()}
            >
                <DialogTitle>
                    Make Deposit
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>You are about to make a deposit.
                        Enter your destination address. Note that your address
                        will be encrypted before leaving your
                        computer.</DialogContentText>
                    <TextField
                        name="amount"
                        onChange={this.updateDepositState.bind (this)}
                        label="Amount..."
                        disabled
                        value={this.state.deposit.amount}
                    />
                    <TextField
                        name="destinationAddress"
                        onChange={this.updateDepositState.bind (this)}
                        label="DestinationAddress..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleMakeDeposit} color="primary">
                        Make Deposit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    };
}

export default DepositDialog;
