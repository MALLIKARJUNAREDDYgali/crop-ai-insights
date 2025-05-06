
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <Leaf size={24} className="text-primary" />
              <span>CropAI</span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  isActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/crop-management" 
                className={({isActive}) => 
                  isActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
                }
              >
                Crop Management
              </NavLink>
              <NavLink 
                to="/fertilizer" 
                className={({isActive}) => 
                  isActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
                }
              >
                Fertilizer
              </NavLink>
              <NavLink 
                to="/diagnosis" 
                className={({isActive}) => 
                  isActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
                }
              >
                Diagnosis
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => 
                  isActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({isActive}) => 
                  isActive ? "text-primary font-medium" : "text-gray-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md"
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg animate-fade-in">
            <NavLink 
              to="/" 
              onClick={toggleMenu}
              className={({isActive}) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/crop-management" 
              onClick={toggleMenu}
              className={({isActive}) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
              }
            >
              Crop Management
            </NavLink>
            <NavLink 
              to="/fertilizer" 
              onClick={toggleMenu}
              className={({isActive}) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
              }
            >
              Fertilizer
            </NavLink>
            <NavLink 
              to="/diagnosis" 
              onClick={toggleMenu}
              className={({isActive}) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
              }
            >
              Diagnosis
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={toggleMenu}
              className={({isActive}) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={toggleMenu}
              className={({isActive}) => 
                isActive 
                  ? "block px-3 py-2 rounded-md text-base font-medium text-primary bg-primary/10"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
