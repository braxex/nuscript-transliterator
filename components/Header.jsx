import Link from 'next/link'
// components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

export default function Header() {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <div className="button-holder">
              <div className="button-div">
                <Button>
                  <Link href="/english">
                    <a className="link">Convert English</a>
                  </Link>
                </Button>
              </div>
              <div className="button-div">
                <Button>
                  <Link href="/ipa">
                    <a className="link">Convert IPA</a>
                  </Link>
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <style jsx>{`
        .button-holder {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .button-div {
          margin: 0 1rem;
        }
        .link {
          text-decoration: none;
          color: white;
        }
      `}</style>
    </>
  )
}
