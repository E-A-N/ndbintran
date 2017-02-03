#In Unit Tests all methods/functions must begin with 'test'.  Inside of test
#based methods/functions a new object must be called

import unittest
import bintran

class bintran_test(unittest.TestCase):

    #test translation boolean
    def test_bin_array(self):
        bt = bintran.bin_translation(0,'+R Venom')
        for z in bt.bin_array:
            self.assertEqual(int,type(z),'This is not an int!')

    #test binary message & alphabet message attributes
    def test_translated(self):
        bt = bintran.bin_translation(0,'Kamehamehaaaa!!')
        bt.translate()
        zk = bintran.bin_translation(1,'1001000 1100101 1111001 100001')
        zk.translate() #Binary for 'Hey!'
        self.assertTrue(bt.translated,'No translation')
        self.assertTrue(zk.translated,'No translation')
        self.assertEqual(zk.temp_trs,'Hey!',"Inaccurate Temporary Translation")

    def test_cool_stuff(self):
        #put binary code inside of variable
        x = 'x+XxZ+@Z+@Z+@x+XxZ+@x+Xx', 'x+Xxx+XxZ+@Z+@Z+@Z+@x+Xx', 'x+Xxx+XxZ+@x+Xxx+Xxx+XxZ+@'
        self.assertEqual(bintran.cool_trans(None,'Z+@','x+Xx',x),'Ean','Inaccurate Translation')

    


if __name__ == '__main__':
    unittest.main()
