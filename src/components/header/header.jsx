import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Select,
  FormControl,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Link from '@material-ui/core/Link';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { colors } from '../../theme'

import Store from "../../stores";
const store = Store.store

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  appbar: {
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  buttons: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  footer: {
    padding: '24px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    }
  },
  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  languageContainer: {
    paddingLeft: '12px',
    display: 'none'
  },
  selectInput: {
    fontSize: '14px',
    color: colors.pink
  },
  link: {
    textDecoration: 'none'
  }
});

class Header extends Component {

  constructor(props) {
    super()

    this.state = {
      languages: store.getStore('languages'),
      language: this.switchLanguage(),
      open: true,
      anchorEl: null
    }
  }

  switchLanguage = () => {
    switch(i18n.language) {
      // case 'zh':
      // case 'zh-CN':
      //   return '中文'
      case 'en':
        return 'English'
      // case 'ja':
      //   return '日本語'
      // case 'th':
      //   return 'ภาษาไทย'
      default:
        return 'English'
    }
  }

  closeAlert = () => {
    this.setState({open: false})
  }

  setAnchorEl = anchorEl => [
    this.setState({ anchorEl })
  ]

  handleClick = (event) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleClose = (language) => {
    let self = this
    i18n.changeLanguage(language).then(() => {
      self.setState({ language: self.switchLanguage(language)})
      self.setAnchorEl(null)
    })
  };

  render() {
    const { classes, t, location } = this.props;
    const { open, anchorEl, language } = this.state

    return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {/* <Link href="/">{t('Footer.Home')}</Link> */}
            <Link href="/">Home</Link>
          </Typography>
          <div className={classes.buttons}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>{language}</Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {/* <MenuItem onClick={this.handleClose.bind(this, 'zh')}>中文</MenuItem> */}
              <MenuItem onClick={this.handleClose.bind(this, 'en')}>English</MenuItem>
              {/* <MenuItem onClick={this.handleClose.bind(this, 'ja')}>日本語</MenuItem> */}
              {/* <MenuItem onClick={this.handleClose.bind(this, 'th')}>ภาษาไทย</MenuItem> */}
            </Menu>
            <Link href="https://twitter.com/DfiMoney" target="_blank">Twitter</Link>
            <Link href="https://t.me/yfiifinance" target="_blank">Telegram</Link>
            <Link href="https://discord.gg/XQ4wnmz" target="_blank">Discord</Link>
            <Link color="inherit">wechat:myGrassU</Link>
          </div>
      </Toolbar>
      </AppBar>
    </div>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Header)));