import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import { withNamespaces } from 'react-i18next';

import {
  ERROR,
  DEPOSIT_POOL,
  DEPOSIT_POOL_RETURNED,
  WITHDRAW_POOL,
  WITHDRAW_POOL_RETURNED,
  DEPOSIT_ALL_POOL,
  DEPOSIT_ALL_POOL_RETURNED,
  WITHDRAW_ALL_POOL,
  WITHDRAW_ALL_POOL_RETURNED,
  CLAIM_POOL,
  CLAIM_POOL_RETURNED
} from '../../constants'

import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const grayColor = [
  "#999",
  "#3C4858",
  "#eee",
  "#343434",
  "#585858",
  "#232323",
  "#ddd",
  "#6c757d",
  "#333",
  "#212121",
  "#777",
  "#D2D2D2",
  "#AAA",
  "#495057",
  "#e5e5e5",
  "#555",
  "#f9f9f9",
  "#ccc",
  "#444",
  "#f2f2f2",
  "#89229b",
  "#c0c1c2",
  "#9a9a9a",
  "#f5f5f5",
  "#505050",
  "#1f1f1f"
];
const whiteColor = "#FFF";

const styles = theme => ({
  value: {
    cursor: 'pointer'
  },
  actionInput: {
    padding: '0px 0px 12px 0px',
    fontSize: '0.5rem'
  },
  balances: {
    width: '100%',
    textAlign: 'right',
    paddingRight: '20px',
    cursor: 'pointer'
  },
  actionsContainer: {
    paddingBottom: '12px',
    display: 'flex',
    flex: '1',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  title: {
    paddingRight: '24px'
  },
  actionButton: {
    height: '47px'
  },
  tradeContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  sepperator: {
    borderBottom: '1px solid #E1E1E1',
    margin: '24px',
    [theme.breakpoints.up('sm')]: {
      width: '40px',
      borderBottom: 'none',
      margin: '0px'
    }
  },
  scaleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 0px 12px 0px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  scale: {
    minWidth: '10px'
  },
  buttonText: {
    fontWeight: '700',
  },
  headingContainer: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  heading: {
    paddingBottom: '12px',
    flex: 1,
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  right: {
    textAlign: 'right'
  },
  buttons: {
    display: 'flex',
    width: '100%'
  },
  modalRoot: {
    overflow: "auto",
    display: "block"
  },
  modal: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "500px",
      margin: "auto"
    },
    borderRadius: "6px",
    overflow: "visible",
    maxHeight: "unset",
    width: "100%",
    marginTop: "130px !important"
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px"
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.5"
  },
  modalCloseButton: {
    "&, &:hover": {
      color: grayColor[0]
    },
    "&:hover": {
      opacity: "1"
    },
    cursor: "pointer",
    padding: "1rem",
    margin: "-1rem -1rem -1rem auto",
    backgroundColor: "transparent",
    border: "0",
    WebkitAppearance: "none",
    float: "right",
    fontSize: "1.5rem",
    fontWeight: "500",
    lineHeight: "1",
    textShadow: "0 1px 0 " + whiteColor,
    opacity: ".5"
  },
  modalClose: {
    width: "16px",
    height: "16px"
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    overflow: "visible"
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0"
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  instructionNoticeModal: {
    marginBottom: "25px"
  },
  imageNoticeModal: {
    maxWidth: "150px"
  },
  modalLarge: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "800px"
    }
  },
  modalSmall: {
    [theme.breakpoints.up("sm")]: {
      width: "300px",
      margin: "auto"
    },
    margin: "0 auto"
  },
  modalSmallBody: {
    marginTop: "20px"
  },
  modalSmallFooterFirstButton: {
    margin: "0",
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "auto"
  },
  modalSmallFooterSecondButton: {
    marginBottom: "0",
    marginLeft: "5px"
  },
  modalLogin: {
    maxWidth: "360px",
    overflowY: "visible",
    width: "100%",
    "& $modalCloseButton": {
      color: whiteColor,
      top: "-10px",
      right: "10px",
      textShadow: "none",
      position: "relative"
    },
    "& $modalHeader": {
      borderBottom: "none",
      paddingTop: "24px",
      paddingRight: "24px",
      paddingBottom: "0",
      paddingLeft: "24px"
    },
    "& $modalBody": {
      paddingBottom: "0",
      paddingTop: "0"
    },
    "& $modalFooter": {
      paddingBottom: "0",
      paddingTop: "0"
    }
  },
  modalLoginCard: {
    marginBottom: "0",
    margin: "0",
    "& $modalHeader": {
      paddingTop: "0"
    }
  },
  modalSignup: {
    maxWidth: "900px",
    width: "100%",
    "& $modalHeader": {
      paddingTop: "0"
    },
    "& $modalTitle": {
      textAlign: "center",
      width: "100%",
      marginTop: "0.625rem"
    },
    "& $modalBody": {
      paddingBottom: "0",
      paddingTop: "0"
    }
  },
  modalSignupCard: {
    padding: "40px 0",
    margin: "0"
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class Asset extends Component {

  constructor() {
    super()

    this.state = {
      amount: '',
      amountError: false,
      redeemAmount: '',
      redeemAmountError: false,
      open: false,
      depositedTime: 0,
      account: store.getStore('account'),
      isClaim: true
    }
  }

  componentWillMount() {
    emitter.on(DEPOSIT_POOL_RETURNED, this.depositReturned);
    emitter.on(WITHDRAW_POOL_RETURNED, this.withdrawReturned);
    emitter.on(DEPOSIT_ALL_POOL_RETURNED, this.depositReturned);
    emitter.on(WITHDRAW_ALL_POOL_RETURNED, this.withdrawReturned);
    emitter.on(CLAIM_POOL_RETURNED, this.claimReturned);
    emitter.on(ERROR, this.errorReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_POOL_RETURNED, this.depositReturned);
    emitter.removeListener(WITHDRAW_POOL_RETURNED, this.withdrawReturned);
    emitter.removeListener(DEPOSIT_ALL_POOL_RETURNED, this.depositReturned);
    emitter.removeListener(WITHDRAW_ALL_POOL_RETURNED, this.withdrawReturned);
    emitter.removeListener(CLAIM_POOL_RETURNED, this.claimReturned);
    emitter.removeListener(ERROR, this.errorReturned);
  };

  setOpen = (open, isClaim) => {
    this.setState({open, isClaim})
  }

  handleClick = (asset, isClaim, event) => {
    if (asset.earnNeed24Hours) {
      const nowTime = new Date().getTime();

      const depositedTime = new Date().getTime() - asset.depositedTime*1000;

      if (depositedTime < 1000*60*60*24) {
        this.setState({ depositedTime })
        return this.setOpen(true, isClaim);
      } 
    } 
    if (isClaim) {
      this.onClaim()
    } else {
      this.onWithdraw()
    }
  };

  formatDuring = (mss) => {
    // var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    // var seconds = (mss % (1000 * 60)) / 1000;
    return hours + " hours " + minutes + " minutes";
  }

  depositReturned = () => {
    this.setState({ loading: false, amount: '' })
  };

  withdrawReturned = (txHash) => {
    this.setState({ loading: false, redeemAmount: '' })
  };

  claimReturned = (txHash) => {
    this.setState({ loading: false, redeemAmount: '' })
  };

  errorReturned = (error) => {
    this.setState({ loading: false })
  };

  render() {
    const { classes, asset } = this.props;
    const {
      account,
      amount,
      amountError,
      redeemAmount,
      redeemAmountError,
      loading,
      open,
      depositedTime,
      isClaim
    } = this.state

    return (<div className={ classes.actionsContainer }>
      <div className={ classes.tradeContainer }>
        {!asset.disabled && <div className={ classes.balances }>
    <Typography variant='h4' onClick={ () => { this.setAmount(100) } } className={ classes.value } noWrap>{ `Balance: ${ asset.myBalance ? (Math.floor(asset.myBalance*10000)/10000).toFixed(4) : '0.0000'} ${ asset.poolSymbol ? asset.poolSymbol : asset.symbol }  (${(asset.balance ? (Math.floor(asset.balance*10000)/10000).toFixed(4) : '0.0000') } ${ asset.tokenSymbol ? asset.tokenSymbol : asset.symbol } )`}</Typography>
        </div>}
        <TextField
          fullWidth
          className={ classes.actionInput }
          id='amount'
          value={ amount }
          error={ amountError }
          onChange={ this.onChange }
          disabled={ loading || asset.disabled }
          placeholder="0.00"
          variant="outlined"
          onKeyDown={ this.inputKeyDown }
        />
        <div className={ classes.scaleContainer }>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading || asset.disabled }
            color="primary"
            onClick={ () => { this.setAmount(25) } }>
            <Typography variant={'h5'}>25%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading || asset.disabled }
            color="primary"
            onClick={ () => { this.setAmount(50) } }>
            <Typography variant={'h5'}>50%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading || asset.disabled }
            color="primary"
            onClick={ () => { this.setAmount(75) } }>
            <Typography variant={'h5'}>75%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading || asset.disabled }
            color="primary"
            onClick={ () => { this.setAmount(100) } }>
            <Typography variant={'h5'}>100%</Typography>
          </Button>
        </div>
        <div className={ classes.buttons }>
          <Button
            className={ classes.actionButton }
            variant="outlined"
            color="primary"
            disabled={ loading || !account.address || asset.balance <= 0 }
            onClick={ this.onDeposit }
            fullWidth
            >
            <Typography className={ classes.buttonText } variant={ 'h5'} color={asset.disabled?'':'secondary'}>Deposit</Typography>
          </Button>
          { asset.version === 2 &&
            <Button
              className={ classes.actionButton }
              variant="outlined"
              color="primary"
              disabled={ loading || !account.address || asset.balance <= 0 }
              onClick={ this.onDepositAll }
              fullWidth
              >
              <Typography className={ classes.buttonText } variant={ 'h5'} color={asset.disabled?'':'secondary'}>Deposit All</Typography>
            </Button>
          }
        </div>
      </div>
      <div className={ classes.sepperator }></div>
      <div className={classes.tradeContainer}>
        <div className={ classes.balances }>
          <Typography variant='h4' className={ classes.value } noWrap>{ asset.pooledBalance ? (Math.floor(asset.pooledBalance*10000)/10000).toFixed(4) : '0.0000' } { asset.poolSymbol }
            <button 
              onClick={this.handleClick.bind(this, asset, true)}
              disabled={ loading || !account.address || asset.pooledBalance <= 0 }
            >
                Claim
            </button> 
            ({ (asset.pricePerFullShare ? (Math.floor(asset.pricePerFullShare*10000)/10000).toFixed(4) : '0.0000') } { asset.symbol })
          </Typography>
        </div>
        <TextField
          fullWidth
          className={ classes.actionInput }
          id='redeemAmount'
          value={ redeemAmount }
          error={ redeemAmountError }
          onChange={ this.onChange }
          disabled={ loading }
          placeholder="0.00"
          variant="outlined"
          onKeyDown={ this.inputRedeemKeyDown }
        />
        <div className={ classes.scaleContainer }>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading }
            color="primary"
            onClick={ () => { this.setRedeemAmount(25) } }>
            <Typography variant={'h5'}>25%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading }
            color="primary"
            onClick={ () => { this.setRedeemAmount(50) } }>
            <Typography variant={'h5'}>50%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading }
            color="primary"
            onClick={ () => { this.setRedeemAmount(75) } }>
            <Typography variant={'h5'}>75%</Typography>
          </Button>
          <Button
            className={ classes.scale }
            variant='text'
            disabled={ loading }
            color="primary"
            onClick={ () => { this.setRedeemAmount(100) } }>
            <Typography variant={'h5'}>100%</Typography>
          </Button>
        </div>
        <div className={ classes.buttons }>
          <Button
            className={ classes.actionButton }
            variant="outlined"
            color="primary"
            disabled={ loading || !account.address || asset.pricePerFullShare <= 0 }
            onClick={ this.handleClick.bind(this, asset, false) }
            fullWidth
            >
            <Typography className={ classes.buttonText } variant={ 'h5'} color='secondary'>Withdraw</Typography>
          </Button>
        </div>
      </div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => this.setOpen(false, true)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => this.setOpen(false,  true)}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>New features of CRV Vault:</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <p>In order to prevent large investors from diluting the income of miners by instant fund injection, after user's each recharges, the farming yield will be released evenly within 24 hours, and all interest can be obtained by withdrawing interest (claim) or withdraw (withdraw) after 1 day. Note: The calculation will restart for 24 hours after each recharge</p>
          <p style={{color: "red"}}>Your actual dividend amount is {
            (Math.floor(depositedTime*asset.pooledBalance*10000)/10000/(1000*60*60*24)).toFixed(4)
          }</p>
          <p>
            Interest collection ratio: {Number(depositedTime*100/(1000*60*60*24)).toFixed(1)}%<br/>
            Time to full prize: {this.formatDuring((1000*60*60*24)-depositedTime)}
          </p>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => this.setOpen(false, true)} color="secondary">
            Close
          </Button>
          <Button color="primary" onClick={isClaim?this.onClaim:this.onWithdraw}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>)
  };

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  inputKeyDown = (event) => {
    if (event.which === 13) {
      this.onInvest();
    }
  }

  onDeposit = () => {
    this.setState({ amountError: false })

    const { amount } = this.state
    const { asset, startLoading } = this.props

    if(!amount || isNaN(amount) || amount <= 0 || amount > asset.balance) {
      this.setState({ amountError: true })
      return false
    }

    this.setState({ loading: true })
    startLoading()
    dispatcher.dispatch({ type: DEPOSIT_POOL, content: { amount: amount, asset: asset } })
  }

  onDepositAll = () => {
    const { asset, startLoading } = this.props

    this.setState({ loading: true })
    startLoading()
    dispatcher.dispatch({ type: DEPOSIT_ALL_POOL, content: { asset: asset } })
  }

  onWithdraw = () => {
    this.setState({ redeemAmountError: false })

    const { redeemAmount } = this.state
    const { asset, startLoading  } = this.props

    if(!redeemAmount || isNaN(redeemAmount) || redeemAmount <= 0 || redeemAmount > asset.pricePerFullShare) {
      this.setState({ redeemAmountError: true })
      return false
    }

    this.setState({ loading: true })
    startLoading()

    dispatcher.dispatch({ type: WITHDRAW_POOL, content: { amount: redeemAmount, asset: asset } })
  }

  onWithdrawAll = () => {
    const { asset, startLoading } = this.props

    this.setState({ loading: true })
    startLoading()
    dispatcher.dispatch({ type: WITHDRAW_ALL_POOL, content: { asset: asset } })
  }

  onClaim = () => {
    console.log('onClaim')
    const { asset, startLoading } = this.props

    this.setState({ loading: true })
    startLoading()

    dispatcher.dispatch({ type: CLAIM_POOL, content: { asset: asset } })
  }

  setAmount = (percent) => {
    if(this.state.loading) {
      return
    }

    const { asset } = this.props

    const balance = asset.balance
    let amount = balance*percent/100
    amount = Math.floor(amount*10000)/10000;

    this.setState({ amount: amount.toFixed(4) })
  }

  setRedeemAmount = (percent) => {
    if(this.state.loading) {
      return
    }

    const balance = this.props.asset.pricePerFullShare
    let amount = balance*percent/100
    amount = Math.floor(amount*10000)/10000;

    this.setState({ redeemAmount: amount.toFixed(4) })
  }
}

export default withNamespaces()(withRouter(withStyles(styles, { withTheme: true })(Asset)));
