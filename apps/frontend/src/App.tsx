import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Full from './components/landingPage/Full';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import File from './components/pdfCompressor/Pdf';
import Image from './components/imageOptimizer/Image';
import { Provider } from "react-redux";
import store from "./redux/store";
import NoHeaderFooterLayout from "./components/layout/NoHeaderFooterLayout";
import MainLayout from "./components/layout/HeaderFooterLayout";   
import Dashboard from './components/dashboard/Dashboard'; 
import ImagePaid from './components/optimizeImagePaid/ImagePaid';
import PdfPaid from './components/compressPDFPaid/PdfPaid';
import Analytics from './components/analytics/Analytics';
import Help from './components/help/Help';
import About from './components/about/About';
import History from './components/history/History';
import Settings from './components/settings/Settings';
import BatchCompressImage from './components/batchCompress/BatchCompressImage';
import Choice from './components/batchCompress/Choice';
import BatchCompressPdf from './components/batchCompress/BatchCompressPdf';

// ScrollToTop Component
const ScrollToTop = () => {
const location = useLocation();

useEffect(() => {
  window.scrollTo(0, 0); // Scroll to the top when the location changes
}, [location]);

return null;
};

const App: React.FC = () => {
    const AddComp = ({ component: Component }: { component: React.ComponentType }) => {
        return (
          <MainLayout>
            <Component />
          </MainLayout>
        );
      };
    return (
        <Provider store={store}>
        <Router>
        <ScrollToTop />
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    <Routes>
                        {/* Landing Page */}
                        <Route path="/" element={<AddComp component={Full} />} />
                        <Route path="/signin" element={<AddComp component={SignIn} />} />
                        <Route path="/signup" element={<AddComp component={SignUp} />} />
                        <Route path="/compressfile" element={<AddComp component={File} />} />
                        <Route path="/optimizeimage" element={<AddComp component={Image} />} />
                    <Route
              path="/dashboard"
              element={
                <NoHeaderFooterLayout>
                  <Dashboard />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/optimizeimage"
              element={
                <NoHeaderFooterLayout>
                  <ImagePaid />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/compresspdf"
              element={
                <NoHeaderFooterLayout>
                  <PdfPaid  />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/analytics"
              element={
                <NoHeaderFooterLayout>
                  <Analytics  />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/help"
              element={
                <NoHeaderFooterLayout>
                  <Help  />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/about"
              element={
                <NoHeaderFooterLayout>
                  <About  />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/history"
              element={
                <NoHeaderFooterLayout>
                  <History  />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <NoHeaderFooterLayout>
                  <Settings  />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/batchcompress"
              element={
                <NoHeaderFooterLayout>
                  <Choice  />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/batchcompress/image"
              element={
                <NoHeaderFooterLayout>
                  <BatchCompressImage  />
                </NoHeaderFooterLayout>
              }
            />
            <Route
              path="/dashboard/batchcompress/pdf"
              element={
                <NoHeaderFooterLayout>
                  <BatchCompressPdf  />
                </NoHeaderFooterLayout>
              }
            />

                    </Routes>
                </main>
            </div>
        </Router>
        </Provider>
    );
};

export default App;
