#include "pch.h"
#include "CppUnitTest.h"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;

namespace UnitTest1
{
	TEST_CLASS(UnitTest1)
	{
	public:
		
		TEST_METHOD(Add)
		{
			Assert::IsTrue(MathFuncsLib::MyMathFuncs::Add(1, 1) == 2);
		}
	};
}
