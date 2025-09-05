import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Clock,
  Leaf,
} from "lucide-react";

const FooterComponent = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-12">
      <div className="mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Logo & Description */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-8 w-8" color="green" />
              <h3 className="text-3xl font-bold font-logo">CampX</h3>
            </div>
            <p className="leading-relaxed text-lg">
              Discover and book unique campgrounds, from serene national parks
              to hidden backcountry spots.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:ml-14 md:w-1/3">
            <h4 className="text-lg font-semibold mb-4 md:mb-5 text-green-600">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>
                  1234 Sadan Tower,
                  <br />
                  Bandra, Mumbai - 022323
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span> (+91) 782295084</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>info-campx@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div className="flex justify-between md:flex-col">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-600">
                Office Hours
              </h4>
              <div className="flex items-start gap-2 mb-4">
                <Clock className="h-5 w-5 mt-0.5" />
                <div>
                  <p>Daily: 8:00 AM - 8:00 PM</p>
                  <p>Monday - Friday</p>
                </div>
              </div>
            </div>

            <div className="ml-6 md:mt-4 md:ml-0">
              <h5 className="text-lg font-semibold mb-3 text-green-600">
                Follow Us
              </h5>
              <div className="flex gap-4">
                <a
                  href="https://x.com/Piyush9436"
                  target="_blank"
                  className="font-mono hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="font-mono hover:text-red-400 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="font-mono hover:text-blue-600 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-sm md:text-base">
              <a href="#" className="hover:text-green-400">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-400">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-400">
                Accessibility
              </a>
            </div>
            <p className="mt-3 md:mt-0 text-sm md:text-md text-gray-300">
              © 2024 CampX Campground. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
