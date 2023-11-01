// routing
import Routes from './Routes';

// project imports
import Locales from 'components/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import Snackbar from 'components/extended/Snackbar';
import ThemeCustomization from 'themes';
import Confirm from 'components/extended/Confirm';
import { ManualSyncDialog } from 'containers';
import CommentDialog from 'containers/CommentDialog';

// ==============================|| APP ||============================== //

const App = () => (
    <ThemeCustomization>
        <Locales>
            <NavigationScroll>
                <>
                    <Routes />
                    <Snackbar />
                    <Confirm />
                    <ManualSyncDialog />
                    <CommentDialog />
                </>
            </NavigationScroll>
        </Locales>
    </ThemeCustomization>
);

export default App;
